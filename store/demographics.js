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
    console.log(demographicsData)
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
    if (demographics[placeId]) {
      // https://gs.mapventure.org/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=demographics:demographics&outputFormat=application/json&cql_filter=id='AK124'

      let queryUrl =
        "https://gs.mapventure.org/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=demographics:demographics&outputFormat=application/json&cql_filter=id='AK124'"
      let returnedData = await $axios
        .get(queryUrl, { timeout: 60000 })
        .catch(err => {
          console.error(err)
        })
      context.commit('setDemographicsData', {
        place: demographics[placeId],
        alaska: demographics['AK0'],
        us: demographics['US0'],
        geometry: returnedData.data.features[0].geometry,
      })
    }
  },
}
