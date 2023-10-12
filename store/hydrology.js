// This store fetches/manages "climate" variables (taspr = temp + precip)
import _ from 'lodash'
import { convertMmToInches, convertToFahrenheit } from '../utils/convert'
import { localStorage, checkForError } from '../utils/localstorage'
import nuxtStorage from 'nuxt-storage'

// Helper functions
var convertReportData = function (hydrologyData) {
  if (hydrologyData) {
    let models = Object.keys(hydrologyData)
    models.forEach(model => {
      if (hydrologyData[model] != null) {
        let scenarios = Object.keys(hydrologyData[model])
        console.log(scenarios)

        scenarios.forEach(scenario => {
          ;['Spring', 'Summer', 'Fall', 'Winter'].forEach(season => {
            console.log(season)
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
    let localKey = 'hydrologyData-' + context.rootGetters['place/urlFragment']()
    let errorKey =
      'hydrologyError-' + context.rootGetters['place/urlFragment']()

    let returnedData = await localStorage(queryUrl, localKey, errorKey)

    if (checkForError(errorKey)) {
      context.commit('setHttpError', nuxtStorage.localStorage.getData(errorKey))
    } else {
      context.commit('setHydrologyData', returnedData.summary)
    }
  },
}
