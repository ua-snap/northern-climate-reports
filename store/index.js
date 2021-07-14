import _ from 'lodash'

export const state = () => ({
  latlng: undefined,
})

export const mutations = {
  setLatLng(state, payload) {
    state.latlng = {
      lat: payload.lat,
      lng: payload.lng,
    }
    this.$router.push({ path: this.$router.path, query: state.latlng })
  },

  // Clear any location data currently in app.
  clearLocation(state) {
    state.latlng = undefined
    this.$router.push({
      path: this.$router.path,
      query: {
        lat: undefined,
        lng: undefined,
      },
    })
  },
}

export const getters = {
  // Boolean if any combo of place identifiers are active,
  // so the report section can be shown when a place has
  // been selected.
  reportIsVisible: (state) => {
    return !_.isUndefined(state.latlng)
  },
}
