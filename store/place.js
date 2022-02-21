// Store, namespaced as `place/`
export const state = () => ({
  // GeoJSON outline for a HUC or protected area.
  geoJSON: undefined,

  // List of all places defined in the application.
  places: undefined,
})

export const getters = {
  // Returns GeoJSON boundary poly.
  geoJSON(state) {
    return state.geoJSON
  },

  places(state) {
    return state.places
  },

  // Gets the currently-selected lat/lon [directly or by placeID]
  latLng: (state, getters, rootState) => {
    // It's in the URL/state, return that.
    if (rootState.route.params.lat && rootState.route.params.lng) {
      return [rootState.route.params.lat, rootState.route.params.lng]
    }

    // Look it up by place name.
    if (rootState.route.params.communityId) {
      let place = _.find(state.places, {
        id: rootState.route.params.communityId,
      })
      if (place) {
        return [place.latitude, place.longitude]
      }
      throw 'Could not find the community by ID.'
    }

    // It's not a point-based location with a defined lat/lon.
    return false
  },

  // If present, returns the HucID in the URL.
  hucId: (state, getters, rootState) => {
    if (rootState.route && rootState.route.params.hucId) {
      return rootState.route.params.hucId
    }
    return false
  },

  // Fetch the protected area ID
  protectedAreaId: (state, getters, rootState) => {
    if (rootState.route.params.protectedAreaId) {
      return rootState.route.params.protectedAreaId
    }
    return false
  },

  // What kind of place is this?
  type: (state, getters, rootState) => {
    if (rootState.route.params.lat && rootState.route.params.lng) {
      return 'latLng'
    } else if (rootState.route.params.communityId) {
      return 'community'
    } else if (rootState.route.params.hucId) {
      return 'huc'
    } else if (rootState.route.params.protectedAreaId) {
      return 'protected_area'
    }
  },

  // Returns a string for the correct current selected place,
  // whether lat/lon, community name, or other regional name.
  // The code here is pretty similar between the different cases,
  // but each has a few slight differences.
  name: (state, getters, rootState) => {
    // Lat/lon!
    if (getters.type == 'latLng') {
      return (
        rootState.route.params.lat +
        '&deg;N, ' +
        Math.abs(rootState.route.params.lng) +
        '&deg;W'
      )
    }

    // Community name!
    if (getters.type == 'community') {
      let place = _.find(state.places, {
        id: rootState.route.params.communityId,
      })
      if (place) {
        let name = place.name
        if (place.alt_name) {
          name += ' (' + place.alt_name + ')'
        }
        return name
      }
    }

    // HUC!
    if (getters.type == 'huc') {
      let huc = _.find(state.places, {
        id: rootState.route.params.hucId,
      })
      if (huc) {
        return huc.name + ' Watershed HUC ' + huc.id
      }
    }

    // Protected area!
    if (getters.type == 'protected_area') {
      let pa = _.find(state.places, {
        id: rootState.route.params.protectedAreaId,
      })
      if (pa) {
        return pa.name
      }
    }

    // Unknown or unset or invalid.
    return false
  },

  // This returns the name of the HUC without any extra stuff.
  rawHucName(state, getters, rootState) {
    if (rootState.route.params.hucId) {
      let huc = _.find(state.places, {
        id: rootState.route.params.hucId,
      })
      if (huc) {
        return huc.name
      }
    }
  },

  // Returns a fragment URL for accessing
  // different resources on the API.
  urlFragment(state, getters) {
    switch (getters.type) {
      // These are the same.
      case 'community':
      case 'latLng':
        return 'point/' + getters.latLng[0] + '/' + getters.latLng[1]
        break
      case 'huc':
        return 'huc/' + getters.hucId
        break
      case 'protected_area':
        return 'protectedarea/' + getters.protectedAreaId
        break
      default:
        // Unknown.
        return undefined
    }
  },
}

export const mutations = {
  setGeoJSON(state, geoJSON) {
    state.geoJSON = geoJSON
  },
  setPlaces(state, places) {
    state.places = places
  },
}

export const actions = {
  async fetch(context) {
    // TODO: add error handling here for 404 (no data) etc.
    let queryUrl =
      process.env.apiUrl + '/boundary/' + context.getters.urlFragment
    let geoJSON = await this.$http.$get(queryUrl)
    context.commit('setGeoJSON', geoJSON)
  },

  async fetchPlaces(context) {
    // TODO: add error handling here for 404 (no data) etc.
    let queryUrl = process.env.apiUrl + '/places/all'
    let places = await this.$http.$get(queryUrl)
    context.commit('setPlaces', places)
  },
}
