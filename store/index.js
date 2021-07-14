import _ from 'lodash'

export const state = () => ({
  latlng: undefined,
})

export const mutations = {
  setLatLng(state, payload) {
    state.latlng = payload
  },

  // Clear any location data currently in app.
  clearLocation(state) {
    state.latlng = undefined
  }
}

export const getters = {
  // Boolean if any combo of place identifiers are active,
  // so the report section can be shown when a place has
  // been selected.
  reportIsVisible: (state) => {
    return !_.isUndefined(state.latlng)
  },
}
