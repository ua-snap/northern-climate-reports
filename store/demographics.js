import { get } from 'lodash'
import demographics from '../assets/demographics.json'
import $axios from 'axios'
import { getHttpError } from '../utils/http_errors'

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
    let placeId

    // We want places of type community | borough | census_area
    let placeType = context.rootGetters['place/type']

    if (placeType == 'community') {
      placeId = context.rootGetters['place/communityId']
    } else if (placeType == 'borough' || placeType == 'census_area') {
      placeId = context.rootGetters['place/areaId']
    }

    // If placeId isn't defined, we don't have demographics for
    // this place.
    if (!placeId) {
      return
    }

    let queryUrl = process.env.apiUrl + '/demographics/' + placeId
    let returnedData = await $axios
      .get(queryUrl, { timeout: 60000 })
      .catch(function (error) {
        if (error.response.status === 403) {
          // Forbidden means adult population < 50
          context.commit('setHttpError', 'low_population')
        } else {
          context.commit('setHttpError', getHttpError(error))
        }
      })

    // If we have an HTTP error, bail.
    if (context.getters['httpError']) {
      return
    }

    // We query for the geometry of the place separately
    let geometryQueryUrl =
      process.env.geoserverUrl +
      "/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=demographics:demographics&outputFormat=application/json&cql_filter=id='" +
      placeId +
      "'"
    let returnedGeometry = await $axios
      .get(geometryQueryUrl, { timeout: 60000 })
      .catch(err => {
        context.commit('setHttpError', getHttpError(err))
      })

    if (returnedData && returnedGeometry) {
      // Make the data returns a bit more regular
      let processed = _.mapValuesDeep(returnedData.data, (value, key) => {
        if (key == 'total_population') {
          // Skip this particular value.
          return value
        }
        if (_.isNumber(value)) {
          return Number.parseFloat(value).toFixed(1)
        } else {
          return value
        }
      })

      context.commit('setDemographicsData', {
        place: processed[placeId],
        alaska: processed['AK0'],
        us: processed['US0'],
        geometry: returnedGeometry.data.features[0].geometry,
      })
    } else {
      // No demographics for this place.
      context.commit('setHttpError', 'no_data')
    }
  },
}
