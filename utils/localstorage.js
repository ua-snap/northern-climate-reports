import _ from 'lodash'
import { getHttpError } from './http_errors'
import $axios from 'axios'
import nuxtStorage from 'nuxt-storage'

export const localStorage = async function (
  queryUrl,
  localKey,
  errorKey = null
) {
  if (nuxtStorage.localStorage.getData(localKey)) {
    return nuxtStorage.localStorage.getData(localKey)
  } else {
    let returnedData = null
    if (nuxtStorage.localStorage.getData(errorKey)) {
      return returnedData
    } else {
      returnedData = await $axios
        .get(queryUrl, { timeout: 60000 })
        .catch(err => {
          nuxtStorage.localStorage.setData(errorKey, getHttpError(err), 4, 'h')
        })
    }
    if (returnedData != null) {
      nuxtStorage.localStorage.setData(localKey, returnedData.data, 4, 'h')
    }
    return returnedData.data
  }
}
