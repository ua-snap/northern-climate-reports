import { convertToFeet } from '../utils/convert'
import { getHttpError } from '../utils/http_errors'

export const state = () => ({
  elevation: undefined,
  httpError: null,
})

export const getters = {
  elevation(state, getters, rootState, rootGetters) {
    // Preserve original data.
    var tempData = _.cloneDeep(state.elevation)
    if (!tempData) {
      return
    }
    if (rootGetters.units == 'imperial') {
      tempData = {
        mean: convertToFeet(tempData.mean),
        min: convertToFeet(tempData.min),
        max: convertToFeet(tempData.max),
      }
    }
    return {
      mean: tempData.mean.toLocaleString('en-US'),
      min: tempData.min.toLocaleString('en-US'),
      max: tempData.max.toLocaleString('en-US'),
    }
  },
  elevationWarning(state) {
    if (!state.elevation) {
      return false
    }
    // If the difference between elevation is 500 feet (152.4 meters)
    // or more, return true so the elevation warning is shown.
    if (state.elevation.max - state.elevation.min >= 152.4) {
      return true
    } else {
      return false
    }
  },
  httpError(state) {
    return state.httpError
  },
}

export const mutations = {
  setElevation(state, elevation) {
    state.elevation = elevation
  },
  clear(state) {
    state.elevation = undefined
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    let queryUrl =
      process.env.apiUrl +
      '/elevation/' +
      context.rootGetters['place/urlFragment']()
    let elevation = await this.$axios.$get(queryUrl).catch(err => {
      let httpError = getHttpError(err)
      context.commit('setHttpError', httpError)
    })
    context.commit('setElevation', elevation)
  },
}
