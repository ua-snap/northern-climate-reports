import _ from 'lodash'
import { getHttpError } from './http_errors'
import $axios from 'axios'
import nuxtStorage from 'nuxt-storage'

export const checkForError = function (errorKey) {
  // This checks if the local storage error exists and if it is a
  // 400, 404, or 422 error. If it isn't, we will retry the API endpoint.
  if (
    nuxtStorage.localStorage.getData(errorKey) &&
    (nuxtStorage.localStorage.getData(errorKey) == 'bad_request' ||
      nuxtStorage.localStorage.getData(errorKey) == 'no_data' ||
      nuxtStorage.localStorage.getData(errorKey) == 'invalid_coordinates')
  ) {
    return true
  } else {
    return false
  }
}

export const localStorage = async function (
  queryUrl,
  localKey,
  errorKey = null
) {
  if (nuxtStorage.localStorage.getData(localKey)) {
    return nuxtStorage.localStorage.getData(localKey)
  } else {
    let returnedData = null
    if (checkForError(errorKey)) {
      return returnedData
    } else {
      returnedData = await $axios
        .get(queryUrl, { timeout: 60000 })
        .catch(err => {
          nuxtStorage.localStorage.setData(
            errorKey,
            getHttpError(err),
            process.env.localStorageExpiration,
            'h'
          )
        })
    }
    if (returnedData) {
      nuxtStorage.localStorage.setData(
        localKey,
        returnedData.data,
        process.env.localStorageExpiration,
        'h'
      )
      return returnedData.data
    }
    
  }
}
