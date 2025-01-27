// This store fetches/manages "climate" variables (taspr = temp + precip)
import _ from 'lodash'
import { convertMmToInches, convertToFahrenheit } from '../utils/convert'
import $axios from 'axios'

// Helper functions
var convertReportData = function (hydrologyData) {
  if (hydrologyData) {
    let models = Object.keys(hydrologyData)
    models.forEach(model => {
      if (hydrologyData[model] != null) {
        let scenarios = Object.keys(hydrologyData[model])
        scenarios.forEach(scenario => {
          ;['Spring', 'Summer', 'Fall', 'Winter'].forEach(season => {
            let eras = Object.keys(hydrologyData[model][scenario][season])
            eras.forEach(era => {
              let variables = Object.keys(
                hydrologyData[model][scenario][season][era]
              )
              variables.forEach(variable => {
                if (variable == 'tmax' || variable == 'tmin') {
                  hydrologyData[model][scenario][season][era][variable][
                    'total'
                  ] = convertToFahrenheit(
                    hydrologyData[model][scenario][season][era][variable][
                      'total'
                    ]
                  )
                } else {
                  hydrologyData[model][scenario][season][era][variable][
                    'total'
                  ] = convertMmToInches(
                    hydrologyData[model][scenario][season][era][variable][
                      'total'
                    ]
                  )
                }
              })
            })
          })
        })
      }
    })

    return hydrologyData
  }
}

export const state = () => ({
  hydrologyData: undefined,
  httpError: null,
})

export const getters = {
  vars() {
    return {
      evap: 'Evapotranspiration',
      runoff: 'Runoff',
    }
  },
  eras() {
    return {
      historical: 'Historical',
      early: 'Early Century',
      mid: 'Mid Century',
      late: 'Late Century',
    }
  },
  models() {
    return {
      1: 'NCAR CCSM4',
      3: 'CanESM2',
      4: 'GFDL ESM2M',
    }
  },
  scenarios() {
    return { 0: 'RCP 4.5', 1: 'RCP 8.5' }
  },
  evapThresholds(state, getters, rootState, rootGetters) {
    let thresholds = [
      {
        label: '',
        min: -30,
        max: 0,
        color: '#c7eae5',
      },
      {
        label: '',
        min: 0,
        max: 10,
        color: '#f5f5f5',
      },
      {
        label: '',
        min: 10,
        max: 20,
        color: '#f6e8c3',
      },
      {
        label: '',
        min: 20,
        max: 30,
        color: '#dfc27d',
      },
      {
        label: '',
        min: 30,
        max: 60,
        color: '#bf812d',
      },
      {
        label: '',
        min: 60,
        max: 90,
        color: '#8c510a',
      },
      {
        label: '',
        min: 90,
        max: 180,
        color: '#543005',
      },
    ]
    let keys = ['min', 'max']
    thresholds.forEach(threshold => {
      keys.forEach(key => {
        threshold[key] =
          rootGetters.units == 'imperial'
            ? convertMmToInches(threshold[key])
            : threshold[key]
      })
    })
    return thresholds
  },
  runoffThresholds(state, getters, rootState, rootGetters) {
    let thresholds = [
      {
        label: '',
        min: 0,
        max: 15,
        color: '#f0f9e8',
      },
      {
        label: '',
        min: 15,
        max: 30,
        color: '#bae4bc',
      },
      {
        label: '',
        min: 30,
        max: 60,
        color: '#7bccc4',
      },
      {
        label: '',
        min: 60,
        max: 90,
        color: '#43a2ca',
      },
      {
        label: '',
        min: 90,
        max: 180,
        color: '#0868ac',
      },
    ]
    let keys = ['min', 'max']
    thresholds.forEach(threshold => {
      keys.forEach(key => {
        threshold[key] =
          rootGetters.units == 'imperial'
            ? convertMmToInches(threshold[key])
            : threshold[key]
      })
    })
    return thresholds
  },

  hydrologyData(state, getters, rootState, rootGetters) {
    var convertedData = _.cloneDeep(state.hydrologyData)

    return rootGetters.units == 'imperial'
      ? convertReportData(convertedData)
      : convertedData
  },
  httpError(state) {
    return state.httpError
  },
}

export const mutations = {
  setHydrologyData(state, hydrologyData) {
    state.hydrologyData = hydrologyData
  },
  clear(state) {
    state.hydrologyData = undefined
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
      '/eds/hydrology/' +
      context.rootGetters['place/urlFragment']()
    let returnedData = await $axios.get(queryUrl, { timeout: 60000 })

    if (returnedData) {
      context.commit('setHydrologyData', returnedData.data.summary)
    } else {
      context.commit('setHttpError', 'no_data')
    }
  },
}
