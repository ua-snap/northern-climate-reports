// this store manages NCAR 12km indicator data
import _ from 'lodash'
import { getHttpError } from '../utils/http_errors'

export const state = () => ({
  indicatorData: undefined,
  httpError: null,
})

export const getters = {
  indicatorData(state) {
    return state.indicatorData
  },

  httpError(state) {
    return state.httpError
  },
}

export const mutations = {
  setIndicatorData(state, indicatorData) {
    state.indicatorData = indicatorData
  },
  clear(state) {
    state.indicatorData = undefined
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    let queryUrl =
      process.env.apiUrl +
      '/indicators/base/' +
      context.rootGetters['place/urlFragment']()
    let indicatorData = await this.$axios.$get(queryUrl).catch(err => {
      let httpError = getHttpError(err)
      context.commit('setHttpError', httpError)
    })
    console.log(indicatorData)
    context.commit('setIndicatorData', indicatorData)
  },
}
