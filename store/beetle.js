// This store manages ALFRESCO data!
import _ from 'lodash'
import $axios from 'axios'

export const state = () => ({
  beetleData: undefined,
  httpError: null,
})

export const getters = {
  beetleData(state) {
    return state.beetleData
  },
  beetleEras() {
    return ['1988-2017', '2010-2039', '2040-2069', '2070-2099']
  },
  beetleModels() {
    return ['Daymet', 'NCAR-CCSM4', 'GFDL-ESM2M', 'HadGEM2-ES', 'MRI CGCM3']
  },
  beetleScenarios() {
    return ['Historical', 'RCP 4.5', 'RCP 8.5']
  },
  beetleSnowpacks() {
    return ['Low Snowpack', 'Medium Snowpack']
  },
  beetleRisks() {
    return [
      {
        label: 'Not modeled or no data',
        color: '#dddddd',
        interpretation:
          'This pixel was not modeled or is not included in the dataset',
      },
      {
        label: 'High Protection',
        color: '#00b800',
        interpretation: 'High climate protection against spruce beetle damage.',
      },
      {
        label: 'Minimal Protection',
        color: '#ffef0a',
        interpretation:
          'Minimal climate protection against spruce beetle damage.',
      },
      {
        label: 'No Protection',
        color: '#fb2f18',
        interpretation: 'No climate protection against spruce beetle damage.',
      },
    ]
  },
  httpError(state) {
    return state.httpError
  },
  valid(state) {
    if (
      _.isObject(state.beetleData) &&
      Object.keys(state.beetleData).length != 0
    ) {
      return true
    } else {
      return false
    }
  },
}

export const mutations = {
  setBeetleData(state, beetleData) {
    state.beetleData = beetleData
  },
  clear(state) {
    state.beetleData = undefined
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
      '/beetles/' +
      context.rootGetters['place/urlFragment']()
    let expectedDataKeys = ['1988-2017', '2010-2039', '2040-2069', '2070-2099']

    let returnedData = await $axios
      .get(queryUrl, { timeout: 60000 })
      .catch(err => {
        console.error(err)
        context.commit('setHttpError', 'server_error')
      })

    let partialData = false
    expectedDataKeys.forEach(key => {
      if (returnedData.data[key] == null) {
        partialData = true
      }
    })

    if (partialData) {
      context.commit('setHttpError', 'no_data')
    } else if (returnedData && !partialData) {
      context.commit('setBeetleData', returnedData.data)
    }
  },
}
