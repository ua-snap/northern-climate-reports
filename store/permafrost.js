// This store manages permafrost data!

import _ from 'lodash'
import { convertToInches, convertToFahrenheit } from '../utils/convert'

var getProcessedData = function (permafrostData) {
  let freezing = 0
  let categories = ['thaw', 'freeze']
  let categorizedData = {}
  let magtData = {}
  let permafrostPresent = false
  let permafrostDisappears = false
  let permafrostUncertain = false

  let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
  let scenarios = ['rcp45', 'rcp85']
  let projectedYears = Object.keys(permafrostData['gipl']).slice(1)

  let historicalAlt =
    permafrostData['gipl']['1995']['cruts31']['historical']['alt']
  let historicalMagt =
    permafrostData['gipl']['1995']['cruts31']['historical']['magt']

  // We cannot determine presence/absence of permafrost when the magnitude of
  // the historical MAGT value is very small.
  if (_.inRange(historicalMagt, -1, 1)) {
    permafrostUncertain = true
  }

  magtData['1995'] = historicalMagt

  categories.forEach(category => {
    categorizedData[category] = {}
    if (category == 'freeze' && historicalMagt <= freezing) {
      categorizedData[category]['1995'] = null
    } else {
      categorizedData[category]['1995'] = historicalAlt
    }

    projectedYears.forEach(year => {
      categorizedData[category][year] = {}
      magtData[year] = {}
      models.forEach(model => {
        categorizedData[category][year][model] = {}
        magtData[year][model] = {}
      })
    })
  })

  models.forEach(model => {
    scenarios.forEach(scenario => {
      let previousMagt = historicalMagt
      projectedYears.forEach(year => {
        let scenarioAlt = permafrostData['gipl'][year][model][scenario]['alt']
        let scenarioMagt = permafrostData['gipl'][year][model][scenario]['magt']

        if (permafrostUncertain) {
          magtData[year][model][scenario] = scenarioMagt
          return
        }

        // An ALT value of 0.07 appears to be nodata.
        // TODO: Convert 0.07 to proper nodata values in the API or GeoServer.
        if (scenarioAlt <= 0.07) {
          categorizedData['thaw'][year][model][scenario] = null
          categorizedData['freeze'][year][model][scenario] = null
          return
        }

        // Populate with thaw data, or null if no permafrost is present.
        // The presence of permafrost is detected by using the sign of the MAGT
        // value to determine if the ALT value for the next time interval should
        // be interpreted as "has permafrost". For example, if the MAGT value
        // for 1995 is negative, the ALT value for the next time interval (the
        // 2025 era) is interpreted as "has permafrost", meaning the ALT value
        // represents the thickness of the active layer above the permafrost
        // during the summer.
        if (previousMagt < freezing) {
          categorizedData['thaw'][year][model][scenario] = scenarioAlt
          permafrostPresent = true
        } else {
          categorizedData['thaw'][year][model][scenario] = null
        }

        // Populate with freeze data, or null if permafrost is present.
        // The absence of permafrost is detected by usingthe sign of the MAGT
        // value to determine if the ALT value for the next time interval should
        // be interpreted as "does not have permafrost". For example, if the
        // MAGT value for 1995 is positive, the ALT value for the next time
        // interval (the 2025 era) is interpreted as "does not have permafrost",
        // meaning the ALT value represents the depth at which the ground
        // freezes during the winter.
        if (previousMagt > freezing) {
          categorizedData['freeze'][year][model][scenario] = scenarioAlt
          permafrostDisappears = true
        } else {
          categorizedData['freeze'][year][model][scenario] = null
        }

        previousMagt = permafrostData['gipl'][year][model][scenario]['magt']
      })
    })
  })

  return {
    present: permafrostPresent,
    disappears: permafrostDisappears,
    uncertain: permafrostUncertain,
    thawData: categorizedData['thaw'],
    freezeData: categorizedData['freeze'],
    magtData: magtData,
  }
}

// Store, namespaced as `permafrost/`
export const state = () => ({
  permafrostData: undefined,
  altThaw: undefined,
  altFreeze: undefined,
  magt: undefined,

  // True if permafrost is present but disappears over time
  disappears: undefined,
  // True if permafrost is still present here
  present: undefined,
  // True if presence/absence of permafrost cannot be determined
  uncertain: undefined,
})

export const getters = {
  permafrostData(state) {
    return state.permafrostData
  },
  altThaw(state, getters, rootState, rootGetters) {
    var tempData = _.cloneDeep(state.altThaw)
    return rootGetters.units == 'imperial'
      ? convertToInches(tempData, 'm')
      : tempData
  },
  altFreeze(state, getters, rootState, rootGetters) {
    var tempData = _.cloneDeep(state.altFreeze)
    return rootGetters.units == 'imperial'
      ? convertToInches(tempData, 'm')
      : tempData
  },
  magt(state, getters, rootState, rootGetters) {
    var tempData = _.cloneDeep(state.magt)
    return rootGetters.units == 'imperial'
      ? convertToFahrenheit(tempData, 'c')
      : tempData
  },
  present(state) {
    return state.present
  },
  disappears(state) {
    return state.disappears
  },
  uncertain(state) {
    return state.uncertain
  },

  // Returns true if there's "valid" permafrost data here, i.e.
  // Permafrost was present historically.
  valid(state) {
    {
      // Bail if there's no data yet.
      if (!state.permafrostData) {
        return
      }

      // If permafrost wasn't present in the past, it's not here now.
      if (
        state.permafrostData['gipl']['1995']['cruts31']['historical']['alt'] ==
        null
      ) {
        return false
      }

      // If permafrost is currently present, or was present, and was
      // successfully sorted into one or more of the three possible categories,
      // this is true.
      if (state.present || state.disappears || state.uncertain) {
        return true
      }
    }
  },
}

export const mutations = {
  setPermafrostData(state, permafrostData) {
    state.permafrostData = permafrostData
  },
  setAltThaw(state, altThaw) {
    state.altThaw = altThaw
  },
  setAltFreeze(state, altFreeze) {
    state.altFreeze = altFreeze
  },
  setMagt(state, magt) {
    state.magt = magt
  },
  setPresent(state, present) {
    state.present = present
  },
  setDisappears(state, disappears) {
    state.disappears = disappears
  },
  setUncertain(state, uncertain) {
    state.uncertain = uncertain
  },
}

export const actions = {
  async fetch(context) {
    // TODO: add error handling here for 404 (no data) etc.

    if (context.rootGetters.latLng) {
      let permafrostQueryUrl =
        process.env.apiUrl +
        '/permafrost/point/' +
        context.rootGetters.latLng[0] +
        '/' +
        context.rootGetters.latLng[1]

      try {
        let permafrostData = await this.$http.$get(permafrostQueryUrl)
        context.commit('setPermafrostData', permafrostData)

        let processedData = getProcessedData(permafrostData)

        context.commit('setAltThaw', processedData.thawData)
        context.commit('setPresent', processedData.present)
        context.commit('setAltFreeze', processedData.freezeData)
        context.commit('setDisappears', processedData.disappears)
        context.commit('setMagt', processedData.magtData)
        context.commit('setUncertain', processedData.uncertain)
      } catch (error) {
        throw error
      }
    } else {
      // This case means "won't query",
      // How to handle this case?
      return false
    }
  },
}
