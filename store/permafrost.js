// This store manages permafrost data!

import _ from 'lodash'

// Helper functions first.

var convertToImperial = function (permafrostData) {
  if (!permafrostData) {
    return
  }

  let t = _.mapValuesDeep(
    permafrostData,
    (value) => {
      if (!value || value == -9999) {
        return null
      } else {
        // Convert meters to inches.
        return parseFloat((value * 39.37008).toFixed(1))
      }
    },
    {
      leavesOnly: true,
    }
  )
  return t
}

// Takes permafrost data (metric) and uses the sign of the MAGT value to
// determine if the ALT value for the next time interval should be interpreted
// as "has permafrost". For example, if the MAGT value for 1995 is negative,
// the ALT value for the next time interval (the 2025 era) is interpreted as
// "has permafrost", meaning the ALT value represents the thickness of the
// active layer above the permafrost during the summer.
var getAltThaw = function (permafrostData) {
  let freezing = 0
  let thawData = {}
  let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
  let scenarios = ['rcp45', 'rcp85']
  let projectedYears = Object.keys(permafrostData['gipl']).slice(1)

  let historicalAlt =
    permafrostData['gipl']['1995']['cruts31']['historical']['alt']
  let historicalMagt =
    permafrostData['gipl']['1995']['cruts31']['historical']['magt']

  if (historicalMagt < freezing) {
    thawData['1995'] = historicalAlt
  } else {
    thawData['1995'] = null
  }

  projectedYears.forEach((year) => {
    thawData[year] = {}
    models.forEach((model) => {
      thawData[year][model] = {}
    })
  })

  let permafrostPresent = false
  models.forEach((model) => {
    scenarios.forEach((scenario) => {
      let previousMagt = historicalMagt
      projectedYears.forEach((year) => {
        let scenarioAlt = permafrostData['gipl'][year][model][scenario]['alt']
        if (previousMagt < freezing) {
          thawData[year][model][scenario] = scenarioAlt
          permafrostPresent = true
        } else {
          thawData[year][model][scenario] = null
        }
        previousMagt = permafrostData['gipl'][year][model][scenario]['magt']
      })
    })
  })

  return {
    thawData: thawData,
    present: permafrostPresent,
  }
}

// Takes permafrost data (metric) and uses the sign of the MAGT value to
// determine if the ALT value for the next time interval should be interpreted
// as "does not have permafrost". For example, if the MAGT value for 1995 is
// positive, the ALT value for the next time interval (the 2025 era) is
// interpreted as "does not have permafrost", meaning the ALT value represents
// the depth at which the ground freezes during the winter.
var getAltFreeze = function (permafrostData) {
  let freezing = 0
  let freezeData = {}
  let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
  let scenarios = ['rcp45', 'rcp85']
  let projectedYears = Object.keys(permafrostData['gipl']).slice(1)

  let historicalAlt =
    permafrostData['gipl']['1995']['cruts31']['historical']['alt']
  let historicalMagt =
    permafrostData['gipl']['1995']['cruts31']['historical']['magt']

  if (historicalMagt > freezing) {
    freezeData['1995'] = historicalAlt
  } else {
    freezeData['1995'] = null
  }

  projectedYears.forEach((year) => {
    freezeData[year] = {}
    models.forEach((model) => {
      freezeData[year][model] = {}
    })
  })

  let permafrostDisappears = false
  models.forEach((model) => {
    scenarios.forEach((scenario) => {
      let previousMagt = historicalMagt
      projectedYears.forEach((year) => {
        let scenarioAlt = permafrostData['gipl'][year][model][scenario]['alt']
        if (scenarioAlt <= 0.07) {
          freezeData[year][model][scenario] = null
        } else if (previousMagt > freezing) {
          freezeData[year][model][scenario] = scenarioAlt
          permafrostDisappears = true
        } else {
          freezeData[year][model][scenario] = null
        }
        previousMagt = permafrostData['gipl'][year][model][scenario]['magt']
      })
    })
  })

  return {
    disappears: permafrostDisappears,
    freezeData: freezeData,
  }
}

// Store, namespaced as `permafrost/`
export const state = () => ({
  permafrostData: undefined,
  altThaw: undefined,
  altFreeze: undefined,

  // True if permafrost is present but disappears over time
  disappears: undefined,
  // True if permafrost is still present here
  present: undefined,
})

export const getters = {
  permafrostData(state) {
    return state.permafrostData
  },
  altThaw(state, getters, rootState, rootGetters) {
    var tempData = _.cloneDeep(state.altThaw)
    return rootGetters.units == 'imperial'
      ? convertToImperial(tempData)
      : tempData
  },
  altFreeze(state, getters, rootState, rootGetters) {
    var tempData = _.cloneDeep(state.altFreeze)
    return rootGetters.units == 'imperial'
      ? convertToImperial(tempData)
      : tempData
  },
  present(state) {
    return state.present
  },
  disappears(state) {
    return state.disappears
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

      // If permafrost is currently present, or was present, this is true.
      if (state.present || state.disappears) {
        return true
      }

      console.error('Indeterminate permafrost state?')
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
  setPresent(state, present) {
    state.present = present
  },
  setDisappears(state, disappears) {
    state.disappears = disappears
  },
}

export const actions = {
  async fetch(context) {
    // TODO: add error handling here for 404 (no data) etc.

    if (context.rootGetters.latLng) {
      let permafrostQueryUrl =
        process.env.apiUrl +
        '/permafrost' +
        context.rootGetters['place/urlFragment']

      try {
        let permafrostData = await this.$http.$get(permafrostQueryUrl)
        context.commit('setPermafrostData', permafrostData)

        let altThaw = getAltThaw(permafrostData)
        let altFreeze = getAltFreeze(permafrostData)

        context.commit('setAltThaw', altThaw.thawData)
        context.commit('setPresent', altThaw.present)
        context.commit('setAltFreeze', altFreeze.freezeData)
        context.commit('setDisappears', altFreeze.disappears)
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
