// This store fetches/manages "climate" variables (taspr = temp + precip)
import _ from 'lodash'
import { convertToInches, convertToFahrenheit } from '../utils/convert'

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
})

export const getters = {
  climateData(state, getters, rootState, rootGetters) {
    var tempData = _.cloneDeep(state.climateData)
    return rootGetters.units == 'imperial'
      ? convertReportData(tempData)
      : tempData
  },
}

export const mutations = {
  setClimateData(state, climateData) {
    state.climateData = climateData
  },
}

export const actions = {
  async fetch(context) {
    // TODO: add error handling here for 404 (no data) etc.
    let queryUrl = process.env.apiUrl + '/taspr'

    // Determine the query type to perform.
    if (context.rootGetters.hucId) {
      // Fetch areal data by HUC.
      queryUrl += '/huc/' + context.rootGetters.hucId
    } else if (context.rootGetters.protectedAreaId) {
      queryUrl += '/protectedarea/' + context.rootGetters.protectedAreaId
    } else if (context.rootGetters.latLng) {
      queryUrl +=
        '/point/' +
        context.rootGetters.latLng[0] +
        '/' +
        context.rootGetters.latLng[1]
    } else {
      // Don't know what to query, this is an error situation.
      console.error("Unknown place type, can't fetch data")
      return
    }

    let climateData = await this.$http.$get(queryUrl)
    context.commit('setClimateData', climateData)
  },
}
