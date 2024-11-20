import { localStorage, checkForError } from '../utils/localstorage'
import nuxtStorage from 'nuxt-storage'
import demographics from '../assets/demographics.json'
import $axios from 'axios'

export const state = () => ({
  demographicsData: undefined,
  httpError: null,
})

export const getters = {
  demographicsData(state, getters, rootState, rootGetters) {
    // Preserve original data.
    var tempData = _.cloneDeep(state.demographicsData)
    if (!tempData) {
      return
    }
    return tempData
  },
  httpError(state) {
    return state.httpError
  },
}

export const mutations = {
  setDemographicsData(state, demographicsData) {
    state.demographicsData = demographicsData
  },
  clear(state) {
    state.demographicsData = undefined
    state.httpError = null
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    let placeId = context.rootGetters['place/communityId']

    // If this isn't a named community, don't try to fetch data.
    if (!placeId) {
      return
    }
    
    let queryUrl = process.env.apiUrl + '/demographics/' + placeId
    let returnedData = await $axios
      .get(queryUrl, { timeout: 60000 })
      .catch(err => {
        console.error(err)
        context.commit('setHttpError', 'no_data')
      })

    // We query for the geometry of the place separately
    let geometryQueryUrl =
      "https://gs.mapventure.org/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=demographics:demographics&outputFormat=application/json&cql_filter=id='" +
      placeId +
      "'"
    let returnedGeometry = await $axios
      .get(geometryQueryUrl, { timeout: 60000 })
      .catch(err => {
        console.error(err)
        context.commit('setHttpError', 'no_data')
      })

    if (returnedData && returnedGeometry) {
      context.commit('setDemographicsData', {
        place: returnedData.data[placeId],
        alaska: returnedData.data['AK0'],
        us: returnedData.data['US0'],
        geometry: returnedGeometry.data.features[0].geometry,
      })
    } else {
      // No demographics for this place.
      context.commit('setHttpError', 'no_data')
    }
  },
}
