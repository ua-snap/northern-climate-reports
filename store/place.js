// This store manages place-based information.
import communities from '~/assets/communities'
import hucs from '~/assets/hucs'
import protectedAreas from '~/assets/protected_areas'

// Store, namespaced as `place/`
export const state = () => ({
  geoJSON: undefined,
})

export const getters = {
  // Returns GeoJSON boundary poly.
  geoJSON(state) {
    return state.geoJSON
  },

  // Gets the currently-selected lat/lon [directly or by placeID]
  latLng: (state, getters, rootState) => {
    if (rootState.route.params.lat && rootState.route.params.lng) {
      return [rootState.route.params.lat, rootState.route.params.lng]
    }

    if (rootState.route.params.communityId) {
      let place = _.find(communities, {
        id: Number(rootState.route.params.communityId),
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
      let place = _.find(communities, {
        id: Number(rootState.route.params.communityId),
      })
      if (place) {
        let name = place.name
        if (place.alt_name) {
          name += ' (' + place.alt_name + ')'
        }
        return name
      }
      throw 'Could not find the community by ID.'
    }

    // HUC!
    if (getters.type == 'huc') {
      let huc = _.find(hucs, {
        id: Number(rootState.route.params.hucId),
      })
      // It's a little meh for the HTML to be here...
      if (huc) {
        return huc.name + ' Watershed HUC ' + huc.id
      }
    }

    // Protected area!
    if (getters.type == 'protected_area') {
      let pa = _.find(protectedAreas, {
        id: rootState.route.params.protectedAreaId,
      })
      if (pa) {
        return pa.name
      }
    }

    // Unknown or unset or invalid.
    return false
  },

  rawHucName(state, getters, rootState) {
    if (rootState.route.params.hucId) {
      let huc = _.find(hucs, {
        id: Number(rootState.route.params.hucId),
      })
      if (huc) {
        return huc.name
      }
    }
  },

  urlFragment(state, getters) {
    switch (getters.type) {
      // These are the same.
      case 'community':
      case 'latLng':
        return 'point/' + getters.latLng[0] + '/' + getters.latLng[1]
        break
      case 'huc':
        return 'huc/huc8/' + getters.hucId
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
}

export const actions = {
  async fetch(context) {
    // TODO: add error handling here for 404 (no data) etc.
    let queryUrl =
      process.env.apiUrl + '/boundary/' + context.getters.urlFragment
    let geoJSON = await this.$http.$get(queryUrl)
    context.commit('setGeoJSON', geoJSON)
  },
}
