// This store manages ALFRESCO data!
import _ from 'lodash'
import { getHttpError } from '../utils/http_errors'
import { convertToPercent } from '../utils/convert'
import { objectTypeSpreadProperty } from '@babel/types'
import nuxtStorage from 'nuxt-storage'

// Store, namespaced as `climate/`
export const state = () => ({
  flammability: undefined,
  veg_change: undefined,
  flammabilityHttpError: null,
  vegChangeHttpError: null,
})

export const getters = {
  flammabilityEras() {
    return ['1950-1979', '1980-2008', '2010-2039', '2040-2069', '2070-2099']
  },
  vegEras() {
    return ['1950-2008', '2010-2039', '2040-2069', '2070-2099']
  },
  vegModels() {
    return [
      '', // Leave historical blank.
      'GFDL CM3',
      'GISS E2-R',
      'IPSL CM5A-LR',
      'MRI CGCM3',
      'NCAR CCSM4',
    ]
  },
  flammabilityModels() {
    return [
      '', // Leave historical blank.
      '5modelAvg',
      'GFDL CM3',
      'GISS E2-R',
      'IPSL CM5A-LR',
      'MRI CGCM3',
      'NCAR CCSM4',
    ]
  },
  scenarios() {
    return ['Historical', 'RCP 4.5', 'RCP 6.0', 'RCP 8.5']
  },
  flammabilityThresholds() {
    return [
      {
        label: 'Not modeled or no data',
        color: '#ffffff',
        interpretation:
          'This pixel was not modeled or is not included in the dataset',
      },
      {
        label: 'Very Low',
        min: 0.0,
        max: 0.2,
        color: '#fef0d9',
        interpretation: 'Fire is absent or very rare',
      },
      {
        label: 'Low',
        min: 0.2,
        max: 0.5,
        color: '#fdcc8a',
        interpretation:
          'Fire is rare, and unlikely to be the primary driver of vegetation patterns on this landscape',
      },
      {
        label: 'Moderate',
        min: 0.5,
        max: 1.0,
        color: '#fc8d59',
        interpretation:
          'Fire is frequent enough to partially define the vegetation patterns on this landscape',
      },
      {
        label: 'High',
        min: 1.0,
        max: 2.0,
        color: '#e34a33',
        interpretation:
          'Fire is more frequent and more dominant in determining vegetation patterns on this landscape',
      },
      {
        label: 'Very High',
        min: 2.0,
        max: 100.0,
        color: '#b30000',
        interpretation:
          'Fire is highly frequent and dominates the vegetation patterns on this landscape',
      },
    ]
  },
  vegTypes() {
    return {
      not_modeled: {
        label: 'Not Modeled',
        color: '#f8faf0',
      },
      barren_lichen_moss: {
        label: 'Barren/Lichen/Moss',
        color: '#616161',
      },
      black_spruce: {
        label: 'Black Spruce',
        color: '#035500',
      },
      deciduous_forest: {
        label: 'Deciduous Forest',
        color: '#dcdc67',
      },
      graminoid_tundra: {
        label: 'Graminoid Tundra',
        color: '#b9ba85',
      },
      shrub_tundra: {
        label: 'Shrub Tundra',
        color: '#abab02',
      },
      temperate_rainforest: {
        label: 'Temperate Rainforest',
        color: '#448844',
      },
      wetland_tundra: {
        label: 'Wetland Tundra',
        color: '#7fc5da',
      },
      white_spruce: {
        label: 'White Spruce',
        color: '#51ab00',
      },
    }
  },
  flammability(state) {
    return state.flammability
  },
  veg_change(state) {
    return state.veg_change
  },
  flammabilityHttpError(state) {
    return state.flammabilityHttpError
  },
  vegChangeHttpError(state) {
    return state.vegChangeHttpError
  },
  valid(state) {
    if (
      _.isObject(state.flammability) &&
      _.isObject(state.veg_change) &&
      Object.keys(state.flammability).length != 0 &&
      Object.keys(state.veg_change).length != 0
    ) {
      return true
    } else {
      return false
    }
  },
  huc12Id(state) {
    return state.flammability.huc_id
  },
}

export const mutations = {
  setFlammability(state, flammability) {
    state.flammability = flammability
  },
  setVegChange(state, veg_change) {
    state.veg_change = veg_change
  },
  clear(state) {
    state.flammability = undefined
    state.veg_change = undefined
  },
  setFlammabilityHttpError(state, error) {
    state.flammabilityHttpError = error
  },
  setVegChangeHttpError(state, error) {
    state.vegChangeHttpError = error
  },
}

export const actions = {
  async fetch(context) {
    // For this query, if it's a point query it needs
    // to use the special `/local` endpoint & pass
    // a parameter to the `urlFragment` getter to return
    // the correct structure.

    if (
      nuxtStorage.localStorage.getData(
        'flammability-' +
          context.rootGetters['place/urlFragment'](
            context.rootGetters['place/isPointLocation']
          )
      )
    ) {
      context.commit(
        'setFlammability',
        nuxtStorage.localStorage.getData(
          'flammability-' +
            context.rootGetters['place/urlFragment'](
              context.rootGetters['place/isPointLocation']
            )
        )
      )
    } else {
      let flammability = null
      if (
        nuxtStorage.localStorage.getData(
          'flammabilityError-' + context.rootGetters['place/urlFragment']()
        )
      ) {
        context.commit(
          'setHttpError',
          nuxtStorage.localStorage.getData(
            'flammabilityError-' + context.rootGetters['place/urlFragment']()
          )
        )
      } else {
        let local = ''
        if (context.rootGetters['place/isPointLocation']) {
          local = 'local/'
        }

        let flammabilityQueryUrl =
          process.env.apiUrl +
          '/alfresco/flammability/' +
          local +
          context.rootGetters['place/urlFragment'](
            context.rootGetters['place/isPointLocation']
          )
        flammability = await this.$axios
          .$get(flammabilityQueryUrl)
          .catch(err => {
            let httpError = getHttpError(err)
            nuxtStorage.localStorage.setData(
              'flammabilityError-' + context.rootGetters['place/urlFragment']()
            )
            context.commit('setFlammabilityHttpError', httpError)
          })
      }
      if (flammability != null) {
        let convertedFlammability = convertToPercent(flammability)
        nuxtStorage.localStorage.setData(
          'flammability-' +
            context.rootGetters['place/urlFragment'](
              context.rootGetters['place/isPointLocation']
            ),
          convertedFlammability,
          4,
          'h'
        )
        context.commit('setFlammability', convertedFlammability)
      }
    }

    if (
      nuxtStorage.localStorage.getData(
        'vegChange-' +
          context.rootGetters['place/urlFragment'](
            context.rootGetters['place/isPointLocation']
          )
      )
    ) {
      context.commit(
        'setVegChange',
        nuxtStorage.localStorage.getData(
          'vegChange-' +
            context.rootGetters['place/urlFragment'](
              context.rootGetters['place/isPointLocation']
            )
        )
      )
    } else {
      let veg_change = null
      if (
        nuxtStorage.localStorage.getData(
          'vegChangeError-' + context.rootGetters['place/urlFragment']()
        )
      ) {
        context.commit(
          'setHttpError',
          nuxtStorage.localStorage.getData(
            'vegChangeError-' + context.rootGetters['place/urlFragment']()
          )
        )
      } else {
        let vegChangeQueryUrl =
          process.env.apiUrl +
          '/alfresco/veg_type/' +
          local +
          context.rootGetters['place/urlFragment'](
            context.rootGetters['place/isPointLocation']
          )
        veg_change = await this.$axios.$get(vegChangeQueryUrl).catch(err => {
          let httpError = getHttpError(err)
          nuxtStorage.localStorage.setData(
            'vegChangeError-' + context.rootGetters['place/urlFragment'](),
            httpError,
            4,
            'h'
          )
          context.commit('setVegChangeHttpError', httpError)
        })
      }
      if (veg_change != null) {
        nuxtStorage.localStorage.setData(
          'vegChange-' +
            context.rootGetters['place/urlFragment'](
              context.rootGetters['place/isPointLocation']
            ),
          veg_change,
          4,
          'h'
        )
        context.commit('setVegChange', veg_change)
      }
    }
  },
}
