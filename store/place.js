// Shim for dev/testing
import _ from 'lodash'
import { localStorage } from '../utils/localstorage'

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

  // If present, returns the community ID in the URL.
  communityId: (state, getters, rootState) => {
    if (rootState.route && rootState.route.params.communityId) {
      return rootState.route.params.communityId
    }
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
    throw 'Unknown place type!'
  },

  // Is this a point-like type?
  isPointLocation: (state, getters) => {
    return getters.type == 'latLng' || getters.type == 'community'
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

    // Area types
    let area = _.find(state.places, {
      id: getters.areaId,
    })
    if (area) {
      switch (getters.type) {
        case 'huc':
          if (area.id.length == 10) {
            return area.name + ' Watershed HUC10 ' + area.id
          }
          return area.name + ' Watershed HUC ' + area.id
        case 'corporation':
          return area.name + ' (Native Corporation)'
        case 'climate_division':
          return area.name + ' (Climate Division)'
        case 'ethnolinguistic_region':
          return area.name + ' (Ethnolinguistic Region)'
        case 'fire_zone':
          return area.name + ' (Fire Management Unit)'
        case 'first_nation':
          return area.name + ' (First Nation Traditional Territory)'
        case 'game_management_unit':
          return area.name + ' (Game Management Unit)'
        case 'borough':
          return area.name + ' (Borough)'
        default:
          return area.name
      }
    }
    throw 'Could not determine name of place from ID.'
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
  // `local` parameter is used when a point is used to
  // query an endpoint that retrieves a coverage over an
  // area instead of a single pixel.
  urlFragment: (state, getters) => local => {
    if (getters.type == 'community' || getters.type == 'latLng') {
      let url = ''
      if (!local) {
        url = 'point/'
      }
      return url + getters.latLng[0] + '/' + getters.latLng[1]
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
  // Boundary to fetch is pulled from the URL fragment by default,
  // or we can pass `huc12Id` if we need to specify a distinct
  // boundary ID to fetch (used for ALFRESCO data).
  async fetch(context, huc12Id) {
    let boundaryId = huc12Id ? 'area/' + huc12Id : context.getters.urlFragment()

    // TODO: add error handling here for 404 (no data) etc.
    let queryUrl = process.env.apiUrl + '/boundary/' + boundaryId
    let geoJSON = await this.$http.$get(queryUrl)
    context.commit('setGeoJSON', geoJSON)
  },

  async fetchPlaces(context) {
    let queryUrl = process.env.apiUrl + '/places/all'

    let localKey = 'places'

    let returnedData = await localStorage(queryUrl, localKey)

    context.commit('setPlaces', returnedData)
  },

  async search(context) {
    // Flush any prior results.
    context.commit('clearSearchResults')

    if (context.getters.latLng) {
      let queryUrl =
        process.env.apiUrl +
        '/places/search/' +
        context.getters.latLng[0] +
        '/' +
        context.getters.latLng[1]

      await this.$http.$get(queryUrl).then(res => {
        // Change the object structure to flatten & sort the areas
        let ssr = []
        _.each(res.climate_divisions_near, place => {
          ssr.push(place)
        })
        _.each(res.corporations_near, place => {
          ssr.push(place)
        })
        _.each(res.fire_management_units_near, place => {
          ssr.push(place)
        })
        _.each(res.hucs_near, place => {
          ssr.push(place)
        })
        _.each(res.protected_areas_near, place => {
          ssr.push(place)
        })
        _.each(res.game_management_units_near, place => {
          ssr.push(place)
        })
        _.each(res.ca_first_nations_near, place => {
          ssr.push(place)
        })
        _.each(res.akcensus_areas_near, place => {
          ssr.push(place)
        })
        _.each(res.ak_boros_near, place => {
          ssr.push(place)
        })
        _.each(res.ethnolinguistic_regions_near, place => {
          ssr.push(place)
        })

        ssr = _.sortBy(ssr, ['name'])

        // Sort the community names, if present
        let communities = []
        if (res.communities) {
          // Restructure communities into an array to sort
          _.each(res.communities, community => {
            communities.push(community)
          })
          communities = _.sortBy(communities, ['name'])
        }
        // Specifically make the communities key false if no matching communities
        // were found.
        if (_.isEmpty(communities)) {
          communities = false
        }
        Object.freeze(res) // remove reactivity of Vue, this is static
        context.commit('setSearchResults', {
          areas: ssr,
          communities: communities,
          total_bounds: res.total_bounds,
        })
      })
    }
  },
}
