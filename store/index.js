import _ from 'lodash'

// Store modules holding per-place report data.
const reportModules = [
  'beetle',
  'climate',
  'elevation',
  'hydrology',
  'indicators',
  'permafrost',
  'place',
  'wildfire',
  'demographics',
]

// Order in which report data is fetched.
const fetchOrder = [
  'climate',
  'permafrost',
  'hydrology',
  'wildfire',
  'indicators',
  'elevation',
  'beetle',
  'demographics',
]

// Report fetch in progress, so views asking for the same place (e.g.
// opening the print view while the report is still loading) share it.
// Report data is only fetched client-side.
let inFlight = { key: null, promise: null }

export const state = () => ({
  units: 'imperial',

  // Key of the place whose report data is currently loaded, so views
  // (e.g. the print report) can reuse it instead of fetching it again.
  reportKey: null,
})

export const mutations = {
  setMetric(state) {
    state.units = 'metric'
  },
  setImperial(state) {
    state.units = 'imperial'
  },
  setReportKey(state, key) {
    state.reportKey = key
  },
}

export const actions = {
  clearReport({ commit }) {
    reportModules.forEach(module => {
      commit(module + '/clear')
    })
    commit('setReportKey', null)
  },

  // Fetches all report data for the place in the current route,
  // unless it's already loaded.
  async fetchReport({ state, getters, commit, dispatch }) {
    if (getters.reportIsCached) {
      return
    }
    let key = getters.placeKey
    if (inFlight.key == key) {
      return inFlight.promise
    }
    let promise = (async () => {
      // Looking up a place's name & coordinates needs the list of places.
      if (!state.place.places) {
        await dispatch('place/fetchPlaces')
      }
      await dispatch('clearReport')
      for (const module of fetchOrder) {
        // Stop if another place's report has been requested since.
        if (inFlight.key != key) {
          return
        }
        await dispatch(module + '/fetch').catch(e => {
          console.error(e)
        })
      }
      if (inFlight.key == key) {
        commit('setReportKey', key)
      }
    })()
    inFlight = { key, promise }
    try {
      await promise
    } finally {
      if (inFlight.promise == promise) {
        inFlight = { key: null, promise: null }
      }
    }
  },
}

// We use vuex-router-sync so some of our state handled from
// the routes.
export const getters = {
  units: state => {
    return state.units
  },

  // Boolean if any combo of place identifiers are active,
  // so the report section can be shown when a place has
  // been selected.
  reportIsVisible: (state, getters) => {
    // If the path contains `report` then the report should be active.
    if (state.route.path) {
      return state.route.path.includes('report')
    }
    return false
  },

  // Identifies the place in the current route, if any.
  placeKey: state => {
    let params = state.route && state.route.params
    if (!params) {
      return null
    }
    if (params.communityId) {
      return 'community/' + params.communityId
    }
    if (params.areaId) {
      return 'area/' + params.areaId
    }
    if (params.lat && params.lng) {
      return params.lat + '/' + params.lng
    }
    return null
  },

  // True if report data for the place in the current route is loaded.
  reportIsCached: (state, getters) => {
    return state.reportKey != null && state.reportKey == getters.placeKey
  },

  mapSearchIsVisible: state => {
    // If the path contains `search` then the map search pane should be active.
    if (state.route.path) {
      return state.route.path.includes('search')
    }
    return false
  },
}
