// This store manages place-based information.

// Store, namespaced as `place/`
export const state = () => ({
  geoJSON: undefined,
})

export const getters = {
  geoJSON(state) {
    return state.geoJSON
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
    let queryUrl = process.env.apiUrl
    if (context.rootGetters.hucId) {
      // Fetch areal data by HUC.
      queryUrl += '/boundary/huc/huc8/' + context.rootGetters.hucId
    } else if (context.rootGetters.protectedAreaId) {
      queryUrl +=
        '/boundary/protectedarea/' + context.rootGetters.protectedAreaId
    } else {
      // Unclear what do do here, bail.
      return
    }

    // TODO, add error handling here.
    let geoJSON = await this.$http.$get(queryUrl)
    context.commit('setGeoJSON', geoJSON)
  },
}
