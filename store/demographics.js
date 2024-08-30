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
    let queryUrl =
      "https://gs.mapventure.org/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=demographics:demographics&outputFormat=application/json&cql_filter=id='" +
      placeId +
      "'"
    let returnedData = await $axios
      .get(queryUrl, { timeout: 60000 })
      .catch(err => {
        console.error(err)
        context.commit('setHttpError', 'no_data')
      })

    // Test for a valid & non-empty response object
    if (
      _.isObject(returnedData.data) &&
      _.isArray(returnedData.data.features) &&
      _.isObject(returnedData.data.features[0]) &&
      _.isObject(returnedData.data.features[0].properties) &&
      _.isObject(returnedData.data.features[0].geometry)
    ) {
      // Valid response.
      context.commit('setDemographicsData', {
        // Sculpt the incoming field names to match nicer-to-read keys,
        // field names from the shapefile are limited in length
        place: {
          id: returnedData.data.features[0].properties.id,
          name: returnedData.data.features[0].properties.name,
          areatype: returnedData.data.features[0].properties.areatype,
          placename: returnedData.data.features[0].properties.placename,
          GEOID: returnedData.data.features[0].properties.GEOID,
          total_population: returnedData.data.features[0].properties.total_popu,
          pct_65_plus: returnedData.data.features[0].properties.pct_65_plu,
          pct_under_18: returnedData.data.features[0].properties.pct_under_,
          pct_hispanic_latino:
            returnedData.data.features[0].properties.pct_hispan,
          pct_white: returnedData.data.features[0].properties.pct_white,
          pct_african_american:
            returnedData.data.features[0].properties.pct_africa,
          pct_amer_indian_ak_native:
            returnedData.data.features[0].properties.pct_amer_i,
          pct_asian: returnedData.data.features[0].properties.pct_asian,
          pct_hawaiian_pacislander:
            returnedData.data.features[0].properties.pct_hawaii,
          pct_other: returnedData.data.features[0].properties.pct_other,
          pct_multi: returnedData.data.features[0].properties.pct_multi,
          pct_w_disability: returnedData.data.features[0].properties.pct_w_disa,
          moe_pct_w_disability:
            returnedData.data.features[0].properties.moe_pct_w_,
          pct_insured: returnedData.data.features[0].properties.pct_insure,
          moe_pct_insured: returnedData.data.features[0].properties.moe_pct_in,
          pct_uninsured: returnedData.data.features[0].properties.pct_uninsu,
          moe_pct_uninsured:
            returnedData.data.features[0].properties.moe_pct_un,
          pct_asthma: returnedData.data.features[0].properties.pct_asthma,
          pct_copd: returnedData.data.features[0].properties.pct_copd,
          pct_hd: returnedData.data.features[0].properties.pct_hd,
          pct_stroke: returnedData.data.features[0].properties.pct_stroke,
          pct_diabetes: returnedData.data.features[0].properties.pct_diabet,
          pct_kd: returnedData.data.features[0].properties.pct_kd,
          pct_minority: returnedData.data.features[0].properties.pct_minori,
          pct_no_hsdiploma: returnedData.data.features[0].properties.pct_no_hsd,
          pct_below_150pov: returnedData.data.features[0].properties.pct_below_,
          pct_no_bband: returnedData.data.features[0].properties.pct_no_bba,
          comment: returnedData.data.features[0].properties.comment,
        },
        alaska: demographics['AK0'],
        us: demographics['US0'],
        geometry: returnedData.data.features[0].geometry,
      })
    } else {
      // No demographics for this place.
      context.commit('setHttpError', 'no_data')
    }
  },
}
