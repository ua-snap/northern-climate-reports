// This store manages ALFRESCO data!
import _ from 'lodash'

// Store, namespaced as `climate/`
export const state = () => ({
  flammability: undefined,
  veg_change: undefined,
})

export const getters = {
  flammability(state, getters, rootState, rootGetters) {
    return state.flammability
  },
  veg_change(state, getters, rootState, rootGetters) {
    return state.veg_change
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
  }
}

export const actions = {
  async fetch(context) {
    // TODO: add error handling here for 404 (no data) etc.
    let flammabilityQueryUrl =
      process.env.apiUrl +
      '/alfresco/flammability/' +
      context.rootGetters['place/urlFragment']
    let flammability = await this.$http.$get(flammabilityQueryUrl)
    context.commit('setFlammability', flammability)

    let vegChangeQueryUrl =
      process.env.apiUrl +
      '/alfresco/veg_change/' +
      context.rootGetters['place/urlFragment']
    let veg_change = await this.$http.$get(vegChangeQueryUrl)
    context.commit('setVegChange', veg_change)
  },
}
