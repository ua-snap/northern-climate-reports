// This store manages ALFRESCO data!
import _ from 'lodash'
import { getHttpError } from '../utils/http_errors'
import { convertToPercent } from '../utils/convert'
import { objectTypeSpreadProperty } from '@babel/types'

// Store, namespaced as `climate/`
export const state = () => ({
  flammability: undefined,
  veg_change: undefined,
  flammabilityHttpError: null,
  vegChangeHttpError: null,
})

export const getters = {
  eras() {
    return ['1950-1979', '1980-2008', '2010-2039', '2040-2069', '2070-2099']
  },
  vegModels() {
    return [
      '',
      'NCAR CCSM4',
      'GFDL CM3',
      'GISS E2-R',
      'IPSL CM5A-LR',
      'MRI CGCM3',
    ]
  },
  flammabilityModels() {
    return [
      '',
      '5modelAvg',
      'GFDL-CM3',
      'GISS-E2-R',
      'IPSL-CM5A-LR',
      'MRI-CGCM3',
      'NCAR-CCSM4',
    ]
  },
  scenarios() {
    return ['Historical', 'RCP 4.5', 'RCP 6.0', 'RCP 8.5']
  },
  vegTypes() {
    return {
      not_modeled: {
        label: 'Not Modeled',
        color: '#ffffff',
      },
      barren_lichen_moss: {
        label: 'Barren/Lichen/Moss',
        color: '#ff7f00',
      },
      black_spruce: {
        label: 'Black Spruce',
        color: '#1f78b4',
      },
      deciduous_forest: {
        label: 'Deciduous Forest',
        color: '#33a02c',
      },
      graminoid_tundra: {
        label: 'Graminoid Tundra',
        color: '#e31a1c',
      },
      shrub_tundra: {
        label: 'Shrub Tundra',
        color: '#fb9a99',
      },
      temperate_rainforest: {
        label: 'Temperate Rainforest',
        color: '#cab2d6',
      },
      wetland_tundra: {
        label: 'Wetland Tundra',
        color: '#fdbf6f',
      },
      white_spruce: {
        label: 'White Spruce',
        color: '#b2df8a',
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
    let flammability = await this.$axios
      .$get(flammabilityQueryUrl)
      .catch(err => {
        let httpError = getHttpError(err)
        context.commit('setFlammabilityHttpError', httpError)
      })
    let convertedFlammability = convertToPercent(flammability)
    context.commit('setFlammability', convertedFlammability)

    let vegChangeQueryUrl =
      process.env.apiUrl +
      '/alfresco/veg_type/' +
      local +
      context.rootGetters['place/urlFragment'](
        context.rootGetters['place/isPointLocation']
      )
    let veg_change = await this.$axios.$get(vegChangeQueryUrl).catch(err => {
      let httpError = getHttpError(err)
      context.commit('setVegChangeHttpError', httpError)
    })
    context.commit('setVegChange', veg_change)
  },
}
