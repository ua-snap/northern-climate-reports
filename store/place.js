// Shim for dev/testing
import _ from 'lodash'

// Store, namespaced as `place/`
export const state = () => ({
  // GeoJSON outline for a HUC or protected area.
  geoJSON: undefined,

  // List of all places defined in the application.
  places: undefined,

  // Search results from a point query
  searchResults: undefined,
})

export const getters = {
  // Returns GeoJSON boundary poly.
  geoJSON(state) {
    return state.geoJSON
  },

  places(state) {
    return state.places
  },

  searchResults(state) {
    return state.searchResults
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

  // If present, returns the area ID from the URL.
  areaId: (state, getters, rootState) => {
    if (rootState.route && rootState.route.params.areaId) {
      return rootState.route.params.areaId
    }
    return false
  },

  // What kind of place is this?
  type: (state, getters, rootState) => {
    if (rootState.route.params.lat && rootState.route.params.lng) {
      return 'latLng'
    } else if (rootState.route.params.communityId) {
      return 'community'
    } else if (rootState.route.params.areaId) {
      let place = _.find(state.places, {
        id: rootState.route.params.areaId,
      })
      if (place) {
        return place.type
      } 
    }
    throw "Unknown place type!"
  },

  // Returns a string for the correct current selected place,
  // whether lat/lon, community name, or other regional name.
  // The code here is pretty similar between the different cases,
  // but each has a few slight differences -- the point of this
  // code is to return a "decorated" version of each place for use
  // in titles, etc.
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
        id: getters.areaId,
      })
      if (huc) {
        return huc.name + ' Watershed HUC ' + huc.id
      }
    }

    // Everything else!
    if (getters.type == 'protected_area' || getters.type == 'corporation' || getters.type == 'climate_division' || getters.type == 'ethnolinguistic_region') {
      let area = _.find(state.places, {
        id: getters.areaId,
      })
      if (area) {
        return area.name
      }
    }

    // Native corps, ethnolinguistic regions, etc...

    // Unknown or unset or invalid.
    return false
  },

  // This returns the name of the HUC without any extra stuff.
  rawHucName(state, getters, rootState) {
    if (rootState.route.params.areaId) {
      let huc = _.find(state.places, {
        id: rootState.route.params.areaId,
      })
      if (huc && huc.type == 'huc') {
        return huc.name
      }
    }
  },

  // Returns a fragment URL for accessing
  // different resources on the API.
  urlFragment(state, getters) {
    if (getters.type == 'community' || getters.type == 'latLng') {
      return 'point/' + getters.latLng[0] + '/' + getters.latLng[1]
    } else {
      return 'area/' + getters.areaId
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
  setSearchResults(state, searchResults) {
    state.searchResults = searchResults
  },
  clear(state) {
    // Flush the geoJSON.
    state.geoJSON = undefined
    // Don't clear the list of places, that's always the same for the UX.
  },
  clearSearchResults(state, searchResults) {
    state.searchResults = undefined
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
    // If we've already fetched this, don't do that again.
    if (context.state.places) {
      return
    }

    // TODO: add error handling here for 404 (no data) etc.
    let queryUrl = process.env.apiUrl + '/places/all'
    let places = await this.$http.$get(queryUrl)
    context.commit('setPlaces', places)
  },

  async search(context) {
    if (context.getters.latLng) {
      let queryUrl =
        process.env.apiUrl +
        '/places/search/' +
        context.getters.latLng[0] +
        '/' +
        context.getters.latLng[1]

      await this.$http.$get(queryUrl).then(res => {
        Object.freeze(res) // remove reactivity of Vue, this is static
        context.commit('setSearchResults', res)
      })
    }
  },
}
