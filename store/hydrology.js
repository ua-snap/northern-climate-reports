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

        scenarios.forEach(scenario => {
          let months = Object.keys(hydrologyData[model][scenario])

          months.forEach(month => {
            let eras = Object.keys(hydrologyData[model][scenario][month])
            eras.forEach(era => {
              let variables = Object.keys(
                hydrologyData[model][scenario][month][era]
              )
              variables.forEach(variable => {
                if (variable == 'tmax' || variable == 'tmin') {
                  hydrologyData[model][scenario][month][era][
                    variable
                  ] = convertToFahrenheit(
                    hydrologyData[model][scenario][month][era][variable]
                  )
                } else {
                  hydrologyData[model][scenario][month][era][
                    variable
                  ] = convertMmToInches(
                    hydrologyData[model][scenario][month][era][variable]
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
// var convertReportData = function (hydrologyData) {
//   if (hydrologyData) {
//     let variables = Object.keys(hydrologyData)
//     variables.forEach(variable => {
//       let models = Object.keys(hydrologyData[variable])

//       models.forEach(model => {
//         if (hydrologyData[variable][model] != null) {
//           let scenarios = Object.keys(hydrologyData[variable][model])

//           scenarios.forEach(scenario => {
//             let months = Object.keys(hydrologyData[variable][model][scenario])

//             months.forEach(month => {
//               let eras = Object.keys(
//                 hydrologyData[variable][model][scenario][month]
//               )
//               eras.forEach(era => {
//                 if (variable == 'tmax' || variable == 'tmin') {
//                   hydrologyData[variable][model][scenario][month][
//                     era
//                   ] = convertToFahrenheit(
//                     hydrologyData[variable][model][scenario][month][era]
//                   )
//                 } else {
//                   hydrologyData[variable][model][scenario][month][
//                     era
//                   ] = convertMmToInches(
//                     hydrologyData[variable][model][scenario][month][era]
//                   )
//                 }
//               })
//             })
//           })
//         }
//       })
//     })

//     return hydrologyData
//   }
// }

export const state = () => ({
  hydrologyData: undefined,
  httpError: null,
})

export const getters = {
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
      '/hydrology/' +
      context.rootGetters['place/urlFragment']()
    let localKey = 'hydrologyData-' + context.rootGetters['place/urlFragment']()
    let errorKey =
      'hydrologyError-' + context.rootGetters['place/urlFragment']()

    let returnedData = await localStorage(queryUrl, localKey, errorKey)

    if (checkForError(errorKey)) {
      context.commit('setHttpError', nuxtStorage.localStorage.getData(errorKey))
    } else {
      context.commit('setHydrologyData', returnedData)
    }
  },
}
