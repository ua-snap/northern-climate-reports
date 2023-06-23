// This store manages ALFRESCO data!
import _ from 'lodash'
import { getHttpError } from '../utils/http_errors'
import nuxtStorage from 'nuxt-storage'

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
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    if (
      nuxtStorage.localStorage.getData(
        'beetleData-' + context.rootGetters['place/urlFragment']()
      )
    ) {
      context.commit(
        'setBeetleData',
        nuxtStorage.localStorage.getData(
          'beetleData-' + context.rootGetters['place/urlFragment']()
        )
      )
    } else {
      let beetleData = null
      if (
        nuxtStorage.localStorage.getData(
          'beetleError-' + context.rootGetters['place/urlFragment']()
        )
      ) {
        context.commit(
          'setHttpError',
          nuxtStorage.localStorage.getData(
            'beetleError-' + context.rootGetters['place/urlFragment']()
          )
        )
      } else {
        let queryUrl =
          process.env.apiUrl +
          '/beetles/' +
          context.rootGetters['place/urlFragment']()
        beetlesData = await this.$axios.$get(queryUrl).catch(err => {
          let httpError = getHttpError(err)
          nuxtStorage.localStorage.setData(
            'beetleError-' + context.rootGetters['place/urlFragment'](),
            httpError,
            4,
            'h'
          )
          context.commit('setHttpError', httpError)
        })
      }
      if (beetleData != null) {
        nuxtStorage.localStorage.setData(
          'beetleData-' + context.rootGetters['place/urlFragment'](),
          beetlesData,
          4,
          'h'
        )
        context.commit('setBeetleData', beetlesData)
      }
    }
  },
}
