// This store manages permafrost data!

import _ from 'lodash'
import { convertToInches, convertToFahrenheit } from '../utils/convert'
import { getHttpError } from '../utils/http_errors'

var getProcessedData = function (permafrostData) {
  let freezing = 0
  let categories = ['thaw', 'freeze']
  let categorizedData = {}
  let magtData = {}
  let permafrostPresent = false
  let permafrostDisappears = false
  let permafrostUncertain = false
  let noFreeze = false

  let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
  let scenarios = ['rcp45', 'rcp85']
  let projectedYears = ['2025', '2050', '2075', '2095']

  let historicalAlt =
    permafrostData['gipl']['1995']['cruts31']['historical']['alt']
  let historicalMagt =
    permafrostData['gipl']['1995']['cruts31']['historical']['magt']

  // If there are no ALT values, there is no permafrost and no ground freeze at
  // this location.
  noFreeze = _.reduceDeep(
    permafrostData,
    (acc, value, key) => {
      if (acc == false) {
        return acc
      }
      if (key == 'alt') {
        if (value == null) {
          return true
        } else {
          return false
        }
      }
      return true
    },
    {
      leavesOnly: true,
    }
  )

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

        if (permafrostUncertain || noFreeze) {
          magtData[year][model][scenario] = scenarioMagt
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
    noFreeze: noFreeze,
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
  // True if permafrost is not present and the ground does not freeze
  noFreeze: undefined,

  httpError: null,
})

export const getters = {
  eras() {
    return ['1995', '2011-2040', '2036-2065', '2061–2090', '2086–2100']
  },
  models() {
    return {
      3: 'NCAR CCSM4',
      4: 'MRI CGCM3',
    }
  },
  scenarios() {
    return ['CRU TS 3.1', 'RCP 4.5', 'RCP 8.5']
  },
  magtThresholds(state, getters, rootState, rootGetters) {
    let thresholds = [
      {
        label: 'Continuous Permafrost',
        min: -20,
        max: -6,
        color: '#2166ac',
      },
      {
        label: 'Cold Discontinuous',
        min: -6,
        max: -4,
        color: '#4393c3',
      },
      {
        label: 'Discontinuous',
        min: -4,
        max: -2,
        color: '#92c5de',
      },
      {
        label: 'Cold Sporadic',
        min: -2,
        max: -1,
        color: '#d1e5f0',
      },
      {
        label: 'Sporadic',
        min: -1,
        max: 0,
        color: '#f7f7f7',
      },
      {
        label: 'Permafrost Possible',
        min: 0,
        max: 1,
        color: '#fddbc7',
      },
      {
        label: 'Permafrost Unlikely',
        min: 1,
        max: 2,
        color: '#f4a582',
      },
      {
        label: 'No Permafrost',
        min: 2,
        max: 20,
        color: '#d6604d',
      },
    ]
    let keys = ['min', 'max']
    thresholds.forEach(threshold => {
      keys.forEach(key => {
        threshold[key] =
          rootGetters.units == 'imperial'
            ? parseFloat((threshold[key] * 1.8 + 32).toFixed())
            : threshold[key]
      })
    })
    return thresholds
  },
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
  noFreeze(state) {
    return state.noFreeze
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
        state.permafrostData['gipl'] == null ||
        state.permafrostData['gipl']['1995'] == null ||
        state.permafrostData['gipl']['1995']['cruts31']['historical']['alt'] ==
          null
      ) {
        return false
      }

      // If permafrost data was successfully sorted into one or more of the four
      // possible categories, this is true.
      if (
        state.present ||
        state.disappears ||
        state.uncertain ||
        state.noFreeze
      ) {
        return true
      }
    }
  },

  httpError(state) {
    return state.httpError
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
  setNoFreeze(state, noFreeze) {
    state.noFreeze = noFreeze
  },
  clear(state) {
    state.permafrostData = undefined
    state.altThaw = undefined
    state.altFreeze = undefined
    state.magt = undefined
    state.disappears = undefined
    state.present = undefined
    state.uncertain = undefined
    state.noFreeze = undefined
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    if (context.rootGetters['place/latLng']) {
      let permafrostQueryUrl =
        process.env.apiUrl +
        '/permafrost/' +
        context.rootGetters['place/urlFragment']()

      try {
        let permafrostData = await this.$axios
          .$get(permafrostQueryUrl)
          .catch(err => {
            let httpError = getHttpError(err)
            context.commit('setHttpError', httpError)
          })

        if (permafrostData != null) {
          if (permafrostData['gipl'] != null) {
            context.commit('setPermafrostData', permafrostData)
            let processedData = getProcessedData(permafrostData)
            context.commit('setAltThaw', processedData.thawData)
            context.commit('setPresent', processedData.present)
            context.commit('setAltFreeze', processedData.freezeData)
            context.commit('setDisappears', processedData.disappears)
            context.commit('setMagt', processedData.magtData)
            context.commit('setUncertain', processedData.uncertain)
            context.commit('setNoFreeze', processedData.noFreeze)
          } else {
            context.commit('setHttpError', 'no_data')
          }
        }
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
