// This store manages permafrost data!

import _ from 'lodash'
import { convertToInches, convertToFahrenheit } from '../utils/convert'
import { getHttpError } from '../utils/http_errors'
import nuxtStorage from 'nuxt-storage'

// Store, namespaced as `permafrost/`
export const state = () => ({
  permafrostData: undefined,
  httpError: null,
})

export const getters = {
  years() {
    return ['2021-2039', '2040-2069', '2070-2099']
  },
  models() {
    return {
      1: 'GFDL CM3',
      2: 'NCAR CCSM4',
    }
  },
  scenarios() {
    return ['RCP 4.5', 'RCP 8.5']
  },
  magtThresholds(state, getters, rootState, rootGetters) {
    let thresholds = [
      {
        label: 'Continuous Permafrost',
        min: -20,
        max: -6,
        color: '#2166ac',
      },
      {
        label: 'Cold Discontinuous',
        min: -6,
        max: -4,
        color: '#4393c3',
      },
      {
        label: 'Discontinuous',
        min: -4,
        max: -2,
        color: '#92c5de',
      },
      {
        label: 'Cold Sporadic',
        min: -2,
        max: -1,
        color: '#d1e5f0',
      },
      {
        label: 'Sporadic',
        min: -1,
        max: 0,
        color: '#f7f7f7',
      },
      {
        label: 'Permafrost Possible',
        min: 0,
        max: 1,
        color: '#fddbc7',
      },
      {
        label: 'Permafrost Unlikely',
        min: 1,
        max: 2,
        color: '#f4a582',
      },
      {
        label: 'No Permafrost',
        min: 2,
        max: 20,
        color: '#d6604d',
      },
    ]
    let keys = ['min', 'max']
    thresholds.forEach(threshold => {
      keys.forEach(key => {
        threshold[key] =
          rootGetters.units == 'imperial'
            ? parseFloat((threshold[key] * 1.8 + 32).toFixed())
            : threshold[key]
      })
    })
    return thresholds
  },
  permafrostData(state, getters, rootState, rootGetters) {
    var tempData = _.cloneDeep(state.permafrostData)
    return rootGetters.units == 'imperial'
      ? convertToInches(tempData, 'm')
      : tempData
  },

  // Returns true if there's "valid" permafrost data here.
  valid(state) {
    if (
      _.isObject(state.permafrostData) &&
      Object.keys(state.permafrostData).length != 0
    ) {
      return true
    } else {
      return false
    }
  },

  httpError(state) {
    return state.httpError
  },

  validTopData(state) {
    let permafrosttopValues = []
    _.eachDeep(state.permafrostData, (value, key) => {
      if (key == 'permafrosttop') {
        permafrosttopValues.push(value)
      }
    })
    return !permafrosttopValues.every(value => value === 0)
  },
}

export const mutations = {
  setPermafrostData(state, permafrostData) {
    state.permafrostData = permafrostData
  },

  clear(state) {
    state.permafrostData = undefined
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    if (
      nuxtStorage.localStorage.getData(
        'permafrostData-' + context.rootGetters['place/urlFragment']()
      )
    ) {
      context.commit(
        'setPermafrostData',
        nuxtStorage.localStorage.getData(
          'permafrostData-' + context.rootGetters['place/urlFragment']()
        )
      )
    } else {
      if (context.rootGetters['place/latLng']) {
        let permafrostQueryUrl =
          process.env.apiUrl +
          '/ncr/permafrost/' +
          context.rootGetters['place/urlFragment']()
        try {
          let permafrostData = null
          if (
            nuxtStorage.localStorage.getData(
              'permafrostError-' + context.rootGetters['place/urlFragment']()
            )
          ) {
            context.commit(
              'setHttpError',
              nuxtStorage.localStorage.getData(
                'permafrostError-' + context.rootGetters['place/urlFragment']()
              )
            )
          } else {
            permafrostData = await this.$axios
              .$get(permafrostQueryUrl, { timeout: 60000 })
              .catch(err => {
                let httpError = getHttpError(err)
                nuxtStorage.localStorage.setData(
                  'permafrostError-' +
                    context.rootGetters['place/urlFragment'](),
                  httpError,
                  4,
                  'h'
                )
                context.commit('setHttpError', httpError)
              })
          }
          if (permafrostData != null) {
            nuxtStorage.localStorage.setData(
              'permafrostData-' + context.rootGetters['place/urlFragment'](),
              permafrostData,
              4,
              'h'
            )
            context.commit('setPermafrostData', permafrostData)
          }
        } catch (error) {
          throw error
        }
      } else {
        // This case means "won't query",
        // How to handle this case?
        return false
      }
    }
  },
}
