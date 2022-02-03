import _ from 'lodash'

export const state = () => ({
  units: 'imperial',
})

export const mutations = {
  setMetric(state) {
    state.units = 'metric'
  },
  setImperial(state) {
    state.units = 'imperial'
  },
}

// We use vuex-router-sync so some of our state handled from
// the routes.
export const getters = {
  units: (state) => {
    return state.units
  },

  // Boolean if any combo of place identifiers are active,
  // so the report section can be shown when a place has
  // been selected.
  reportIsVisible: (state, getters) => {
    return getters['place/type']
  }
}
