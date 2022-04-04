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
  eras() {
    return [
      '2010-2019',
      '2020-2029',
      '2030-2039',
      '2040-2049',
      '2050-2059',
      '2060-2069',
      '2070-2079',
      '2080-2089',
      '2090-2099',
    ]
  },
  models() {
    return [
      '5 Model Average',
      'GFDL CM3',
      'GISS E2-R',
      'IPSL CM5A-LR',
      'MRI CGCM3',
      'NCAR CCSM4',
    ]
  },
  scenarios() {
    return ['RCP 4.5', 'RCP 6.0', 'RCP 8.5']
  },
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
      '/alfresco/veg_type/' +
      context.rootGetters['place/urlFragment']
    let veg_change = await this.$axios.$get(vegChangeQueryUrl).catch(err => {
      let httpError = getHttpError(err)
      context.commit('setVegChangeHttpError', httpError)
    })
    context.commit('setVegChange', veg_change)
  },
}
