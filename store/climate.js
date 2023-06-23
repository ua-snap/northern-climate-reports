// This store fetches/manages "climate" variables (taspr = temp + precip)
import _ from 'lodash'
import { convertToInches, convertToFahrenheit } from '../utils/convert'
import { getHttpError } from '../utils/http_errors'
import nuxtStorage from 'nuxt-storage'

// Helper functions
var convertReportData = function (climateData) {
  if (climateData) {
    let historicalPeriod = Object.keys(climateData).slice(0, 1)
    let seasons = Object.keys(climateData['1950_2009'])
    seasons.forEach(season => {
      let historicalTas =
        climateData['1950_2009'][season]['CRU-TS40']['CRU_historical']['tas']
      let historicalPr =
        climateData['1950_2009'][season]['CRU-TS40']['CRU_historical']['pr']
      historicalTas = convertToFahrenheit(historicalTas, 'c')
      historicalPr = convertToInches(historicalPr, 'mm')
      climateData['1950_2009'][season]['CRU-TS40']['CRU_historical'][
        'tas'
      ] = historicalTas
      climateData['1950_2009'][season]['CRU-TS40']['CRU_historical'][
        'pr'
      ] = historicalPr
    })

    let projectedDecades = Object.keys(climateData).slice(1)
    projectedDecades.forEach(decade => {
      climateData[decade] = convertToInches(climateData[decade], 'mm', ['pr'])
      climateData[decade] = convertToFahrenheit(climateData[decade], 'c', [
        'tas',
      ])
    })

    return climateData
  }
}

// Store, namespaced as `climate/`
export const state = () => ({
  climateData: undefined,
  httpError: null,
})

export const getters = {
  // Used for performing % delta computations where needed
  rawClimateData(state) {
    return state.climateData
  },
  climateData(state, getters, rootState, rootGetters) {
    var convertedData = _.cloneDeep(state.climateData)
    return rootGetters.units == 'imperial'
      ? convertReportData(convertedData)
      : convertedData
  },
  httpError(state) {
    return state.httpError
  },
}

export const mutations = {
  setClimateData(state, climateData) {
    state.climateData = climateData
  },
  clear(state) {
    state.climateData = undefined
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    if (
      nuxtStorage.localStorage.getData(
        'climateData-' + context.rootGetters['place/urlFragment']()
      )
    ) {
      context.commit(
        'setClimateData',
        nuxtStorage.localStorage.getData(
          'climateData-' + context.rootGetters['place/urlFragment']()
        )
      )
    } else {
      let climateData = null
      if (
        nuxtStorage.localStorage.getData(
          'climateError-' + context.rootGetters['place/urlFragment']()
        )
      ) {
        context.commit(
          'setHttpError',
          nuxtStorage.localStorage.getData(
            'climateError-' + context.rootGetters['place/urlFragment']()
          )
        )
      } else {
        let queryUrl =
          process.env.apiUrl +
          '/taspr/' +
          context.rootGetters['place/urlFragment']()
        climateData = await this.$axios.$get(queryUrl).catch(err => {
          let httpError = getHttpError(err)
          nuxtStorage.localStorage.setData(
            'climateError-' + context.rootGetters['place/urlFragment'](),
            httpError,
            4,
            'h'
          )
          context.commit('setHttpError', httpError)
        })
      }
      if (climateData != null) {
        nuxtStorage.localStorage.setData(
          'climateData-' + context.rootGetters['place/urlFragment'](),
          climateData,
          4,
          'h'
        )
        context.commit('setClimateData', climateData)
      }
    }
  },
}
