// this store manages NCAR 12km indicator data
import _ from 'lodash'
import { convertMmToInches, convertValueToFahrenheit } from '../utils/convert'
import { getHttpError } from '../utils/http_errors'
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
    if (
      nuxtStorage.localStorage.getData(
        'indicatorData-' + context.rootGetters['place/urlFragment']()
      )
    ) {
      context.commit('setIndicatorData', indicatorData)
    } else {
      let indicatorData = null
      if (
        nuxtStorage.localStorage.getData(
          'indicatorError-' + context.rootGetters['place/urlFragment']()
        )
      ) {
        context.commit(
          'setHttpError',
          nuxtStorage.localStorage.getData(
            'indicatorError-' + context.rootGetters['place/urlFragment']()
          )
        )
      } else {
        let queryUrl =
          process.env.apiUrl +
          '/indicators/base/' +
          context.rootGetters['place/urlFragment']()
        indicatorData = await this.$axios.$get(queryUrl).catch(err => {
          let httpError = getHttpError(err)
          nuxtStorage.localStorage.setData(
            'indicatorError-' + context.rootGetters['place/urlFragment'](),
            httpError
          )
          context.commit('setHttpError', httpError)
        })
        if (indicatorData != null) {
          nuxtStorage.localStorage.setData(
            'indicatorData-' + context.rootGetters['place/urlFragment'](),
            indicatorData,
            4,
            'h'
          )
          context.commit('setIndicatorData', indicatorData)
        }
      }
    }
  },
}
