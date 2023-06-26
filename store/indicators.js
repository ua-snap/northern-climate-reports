// this store manages NCAR 12km indicator data
import _ from 'lodash'
import { convertMmToInches, convertValueToFahrenheit } from '../utils/convert'
import { localStorage } from '../utils/localstorage'
import nuxtStorage from 'nuxt-storage'

var convertTemperatureData = function (obj) {
  if (typeof obj === 'number') {
    return convertValueToFahrenheit(obj)
  } else if (typeof obj === 'object') {
    for (let key in obj) {
      obj[key] = convertTemperatureData(obj[key])
    }
    return obj
  } else {
    return obj
  }
}

var convertPrecipitationData = function (obj) {
  if (typeof obj === 'number') {
    return convertMmToInches(obj)
  } else if (typeof obj === 'object') {
    for (let key in obj) {
      obj[key] = convertPrecipitationData(obj[key])
    }
    return obj
  } else {
    return obj
  }
}

var convertReportData = function (indicatorData) {
  if (indicatorData) {
    let tempIndicators = ['cd', 'hd']
    tempIndicators.forEach(indicator => {
      indicatorData[indicator] = convertTemperatureData(
        indicatorData[indicator]
      )
    })

    let precipIndicators = ['rx1day', 'rx5day']
    precipIndicators.forEach(indicator => {
      indicatorData[indicator] = convertPrecipitationData(
        indicatorData[indicator]
      )
    })

    return indicatorData
  }
}

export const state = () => ({
  indicatorData: undefined,
  httpError: null,
})

export const getters = {
  indicatorData(state, getters, rootState, rootGetters) {
    var convertedData = _.cloneDeep(state.indicatorData)
    return rootGetters.units == 'imperial'
      ? convertReportData(convertedData)
      : convertedData
  },

  httpError(state) {
    return state.httpError
  },
}

export const mutations = {
  setIndicatorData(state, indicatorData) {
    state.indicatorData = indicatorData
  },
  clear(state) {
    state.indicatorData = undefined
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    let queryUrl =
      process.env.apiUrl +
      '/indicators/base/' +
      context.rootGetters['place/urlFragment']()
    let localKey = 'indicatorData-' + context.rootGetters['place/urlFragment']()
    let errorKey =
      'indicatorError-' + context.rootGetters['place/urlFragment']()

    let returnedData = await localStorage(queryUrl, localKey, errorKey)

    if (nuxtStorage.localStorage.getData(errorKey)) {
      context.commit('setHttpError', nuxtStorage.localStorage.getData(errorKey))
    } else {
      context.commit('setIndicatorData', returnedData)
    }
  },
}
