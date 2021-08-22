import _ from 'lodash'
import places from '~/assets/places.js'

// We use vuex-router-sync so some of our state handled from
// the routes.
export const getters = {
  // Boolean if any combo of place identifiers are active,
  // so the report section can be shown when a place has
  // been selected.
  reportIsVisible: (state) => {
    return (
      (state.route.params.lat && state.route.params.lng) ||
      state.route.params.communityId
    )
  },

  // Gets the currently-selected lat/lon [directly or by placeID]
  getLatLng: (state) => {
    if (state.route.params.lat && state.route.params.lng) {
      return [state.route.params.lat, state.route.params.lng]
    }

    if (state.route.params.communityId) {
      let place = _.find(places, { id: Number(state.route.params.communityId) })
      if (place) {
        return [place.latitude, place.longitude]
      }
      throw 'Could not find the community by ID.'
    }
  },

  // Returns a string for the correct current selected place,
  // whether lat/lon, community name, or other regional name.
  getPlaceName: (state) => {
    if (state.route.params.lat && state.route.params.lng) {
      return (
        state.route.params.lat + '&deg;N, ' + state.route.params.lng + '&deg;E'
      )
    }

    if (state.route.params.communityId) {
      let place = _.find(places, { id: Number(state.route.params.communityId) })
      if (place) {
        return place.name
      }
      throw 'Could not find the community by ID.'
    }
  },
}
