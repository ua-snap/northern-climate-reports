// This store fetches/manages "climate" variables (temp + precip)
import _ from 'lodash'

// Helper functions
var convertReportData = function (climateData) {
  if (climateData) {
    Object.keys(climateData).forEach((decade) => {
      if (decade === '1950_2009') {
        climateData[decade] = convertTasPrHistorical(climateData[decade])
      } else {
        climateData[decade] = convertTasPrMeans(climateData[decade])
      }
    })
    return climateData
  }
}

var convertTasPrMeans = function (data) {
  return _.mapValuesDeep(
    data,
    (value, key, context) => {
      if (key == 'pr') {
        // Convert to inches!
        return parseFloat((value * 0.03937008).toFixed(1))
      } else if (key == 'tas') {
        // Convert to degrees F!
        return parseFloat((value * 1.8 + 32).toFixed(1))
      }
    },
    {
      leavesOnly: true,
    }
  )
}

var convertTasPrHistorical = function (data) {
  let convertedData = _.cloneDeep(data)
  Object.keys(convertedData).forEach((season) => {
    let seasonObj = convertedData[season]['CRU-TS40']['CRU_historical']
    Object.keys(seasonObj).forEach((climate_variable) => {
      Object.keys(seasonObj[climate_variable]).forEach((stat) => {
        let original = seasonObj[climate_variable][stat]
        if (climate_variable === 'tas') {
          let converted = parseFloat((original * 1.8 + 32).toFixed(1))
          seasonObj[climate_variable][stat] = converted
        } else {
          let converted = parseFloat((original * 0.03937008).toFixed(1))
          seasonObj[climate_variable][stat] = converted
        }
      })
    })
  })
  return convertedData
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
