// This store fetches/manages "climate" variables (taspr = temp + precip)
import _ from 'lodash'
import { convertToInches, convertToFahrenheit } from '../utils/convert'
import { getHttpError } from '../utils/http_errors'

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
  climateData(state, getters, rootState, rootGetters) {
    var tempData = _.cloneDeep(state.climateData)
    return rootGetters.units == 'imperial'
      ? convertReportData(tempData)
      : tempData
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
    let queryUrl =
      process.env.apiUrl + '/taspr/' + context.rootGetters['place/urlFragment']()
    let climateData = await this.$axios.$get(queryUrl).catch(err => {
      let httpError = getHttpError(err)
      context.commit('setHttpError', httpError)
    })
    Object.freeze(climateData)
    context.commit('setClimateData', climateData)
  },
}
