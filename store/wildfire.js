// This store manages ALFRESCO data!
import _ from 'lodash'
import { getHttpError } from '../utils/http_errors'
import { convertToPercent } from '../utils/convert'

// Store, namespaced as `climate/`
export const state = () => ({
  flammability: undefined,
  veg_change: undefined,
  flammabilityHttpError: null,
  vegChangeHttpError: null,
})

export const getters = {
  flammability(state, getters, rootState, rootGetters) {
    return state.flammability
  },
  veg_change(state, getters, rootState, rootGetters) {
    return state.veg_change
  },
  flammabilityHttpError(state) {
    return state.flammabilityHttpError
  },
  vegChangeHttpError(state) {
    return state.vegChangeHttpError
  },
}

export const mutations = {
  setFlammability(state, flammability) {
    state.flammability = flammability
  },
  setVegChange(state, veg_change) {
    state.veg_change = veg_change
  },
  clear(state) {
    state.flammability = undefined
    state.veg_change = undefined
  },
  setFlammabilityHttpError(state, error) {
    state.flammabilityHttpError = error
  },
  setVegChangeHttpError(state, error) {
    state.vegChangeHttpError = error
  },
}

export const actions = {
  async fetch(context) {
    let flammabilityQueryUrl =
      process.env.apiUrl +
      '/alfresco/flammability/' +
      context.rootGetters['place/urlFragment']
    let flammability = await this.$axios
      .$get(flammabilityQueryUrl)
      .catch(err => {
        let httpError = getHttpError(err)
        context.commit('setFlammabilityHttpError', httpError)
      })
    let convertedFlammability = convertToPercent(flammability)
    context.commit('setFlammability', convertedFlammability)

    let vegChangeQueryUrl =
      process.env.apiUrl +
      '/alfresco/veg_change/' +
      context.rootGetters['place/urlFragment']
    let veg_change = await this.$axios.$get(vegChangeQueryUrl).catch(err => {
      let httpError = getHttpError(err)
      context.commit('setVegChangeHttpError', httpError)
    })
    let convertedVegChange = convertToPercent(veg_change)
    context.commit('setVegChange', convertedVegChange)
  },
}
