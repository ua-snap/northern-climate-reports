// This store fetches/manages "climate" variables (taspr = temp + precip)
import _ from 'lodash'
import { convertToInches, convertToFahrenheit } from '../utils/convert'
import $axios from 'axios'
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
    state.httpError = null
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    let queryUrl =
      process.env.apiUrl +
      '/taspr/' +
      context.rootGetters['place/urlFragment']()

    let expectedDataKeys = [
      '1950_2009',
      '2010_2019',
      '2020_2029',
      '2030_2039',
      '2040_2049',
      '2040_2069',
      '2050_2059',
      '2060_2069',
      '2070_2079',
      '2070_2099',
      '2080_2089',
      '2090_2099',
    ]

    let returnedData = await $axios
      .get(queryUrl, { timeout: 60000 })
      .catch(err => {
        context.commit('setHttpError', getHttpError(err))
      })

    if (returnedData) {
      let partialData = false
      expectedDataKeys.forEach(key => {
        if (returnedData.data[key] == null) {
          partialData = true
        }
      })

      if (partialData) {
        context.commit('setHttpError', 'no_data')
      } else if (returnedData && !partialData) {
        context.commit('setClimateData', returnedData.data)
      }
    }
  },
}
