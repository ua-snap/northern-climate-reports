import _ from 'lodash'
import places from '~/assets/places.js'

export const state = () => ({
  // Object {lat: ..., lng: ...}
  latlng: undefined,

  // ID corresponding to place lat/lon in assets/places.js
  placeId: undefined,
})

export const mutations = {
  setLatLng(state, payload) {
    if (payload.lat && payload.lng) {
      state.latlng = {
        lat: payload.lat.toFixed(4),
        lng: payload.lng.toFixed(4),
      }
      this.$router.push({ path: this.$router.path, query: state.latlng })
    }
  },

  setPlaceId(state, placeId) {
    // We need to decrement this by one because it seems that the
    // indexing used by the Autocompleter is off by one.
    state.placeId = placeId - 1

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
    return state.latlng || state.placeId
  },

  // Returns a string for the correct current selected place,
  // whether lat/lon, community name, or other regional name.
  getPlaceName: (state) => {
    if (state.latlng) {
      return state.latlng.lat + '&deg;N, ' + state.latlng.lng + '&deg;E'
    }

    if (state.placeId) {
      return places[state.placeId].name
    }
  },
}
