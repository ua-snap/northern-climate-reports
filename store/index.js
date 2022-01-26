import _ from 'lodash'
import communities from '~/assets/communities'
import hucs from '~/assets/hucs'
import protectedAreas from '~/assets/protected_areas'

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
  reportIsVisible: (state) => {
    return (
      (state.route.params.lat && state.route.params.lng) ||
      state.route.params.communityId ||
      state.route.params.protectedAreaId ||
      state.route.params.hucId
    )
  },

  // Gets the currently-selected lat/lon [directly or by placeID]
  getLatLng: (state) => {
    if (state.route.params.lat && state.route.params.lng) {
      return [state.route.params.lat, state.route.params.lng]
    }

    if (state.route.params.communityId) {
      let place = _.find(communities, {
        id: Number(state.route.params.communityId),
      })
      if (place) {
        return [place.latitude, place.longitude]
      }
      throw 'Could not find the community by ID.'
    }

    // It's not a point-based location with a defined lat/lon.
    return undefined
  },

  // If present, returns the HucID in the URL.
  getHucId: (state) => {
    if (state.route.params.hucId) {
      return state.route.params.hucId
    }
  },

  // Fetch the protected area ID
  getProtectedAreaId: (state) => {
    if (state.route.params.protectedAreaId) {
      return state.route.params.protectedAreaId
    }
  },

  // Returns a string for the correct current selected place,
  // whether lat/lon, community name, or other regional name.
  getPlaceName: (state) => {
    // Lat/lon!
    if (state.route.params.lat && state.route.params.lng) {
      return (
        state.route.params.lat +
        '&deg;N, ' +
        Math.abs(state.route.params.lng) +
        '&deg;W'
      )
    }

    // Community name!
    if (state.route.params.communityId) {
      let place = _.find(communities, {
        id: Number(state.route.params.communityId),
      })
      if (place) {
        let name = place.name
        if (place.alt_name) {
          name += ' <span class="alt_name">(' + place.alt_name + ')</span>'
        }
        return name
      }
      throw 'Could not find the community by ID.'
    }

    // HUC!
    if (state.route.params.hucId) {
      let huc = _.find(hucs, {
        id: Number(state.route.params.hucId),
      })
      // It's a little meh for the HTML to be here...
      if (huc) {
        return (
          huc.name +
          ' Watershed <span class="watershed">HUC ' +
          huc.id +
          '</span>'
        )
      }
    }

    // Protected area!
    if (state.route.params.protectedAreaId) {
      let pa = _.find(protectedAreas, {
        id: state.route.params.protectedAreaId,
      })
      if (pa) {
        return pa.name
      }
    }
  },

  getRawHucName(state) {
    if (state.route.params.hucId) {
      let huc = _.find(hucs, {
        id: Number(state.route.params.hucId),
      })
      if (huc) {
        return huc.name
      }
    }
  },
}
