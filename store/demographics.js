import { localStorage, checkForError } from '../utils/localstorage'
import nuxtStorage from 'nuxt-storage'
import demographics from '../assets/demographics.json'

export const state = () => ({
  demographicsData: undefined,
  httpError: null,
})

export const getters = {
  demographicsData(state, getters, rootState, rootGetters) {
    // Preserve original data.
    var tempData = _.cloneDeep(state.demographicsData)
    if (!tempData) {
      return
    }
    return tempData
  },
  httpError(state) {
    return state.httpError
  },
}

export const mutations = {
  setDemographicsData(state, demographicsData) {
    state.demographicsData = demographicsData
  },
  clear(state) {
    state.demographicsData = undefined
    state.httpError = null
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    let placeId = context.rootGetters['place/communityId']
    if(demographics[placeId]) {
      context.commit('setDemographicsData', demographics[placeId])
    }
  },
}