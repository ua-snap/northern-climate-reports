import _ from 'lodash'

export const state = () => ({
  // Object {lat: ..., lng: ...}
  latlng: undefined,

  // ID corresponding to place lat/lon in assets/places.js
  placeId: undefined,
})

export const mutations = {
  setLatLng(state, payload) {
    state.latlng = {
      lat: payload.lat,
      lng: payload.lng,
    }
    this.$router.push({ path: this.$router.path, query: state.latlng })
  },

  setPlaceId(state, placeId) {
    state.placeId = placeId
    this.$router.push({
      path: this.$router.path,
      query: { placeId: state.placeId },
    })
  },

  // Clear any location data currently in app.
  clearLocation(state) {
    state.latlng = undefined
    state.placeId = undefined
    this.$router.push({
      path: this.$router.path,
      query: {
        lat: undefined,
        lng: undefined,
        placeId: undefined,
      },
    })
  },
}

export const getters = {
  // Boolean if any combo of place identifiers are active,
  // so the report section can be shown when a place has
  // been selected.
  reportIsVisible: (state) => {
    return (state.latlng || state.placeId)
  },
}
