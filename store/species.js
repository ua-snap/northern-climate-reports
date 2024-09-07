import nuxtStorage from 'nuxt-storage'
import $axios from 'axios'
import species from '../assets/species.json'

export const state = () => ({
  demographicsData: undefined,
  httpError: null,
})

export const getters = {
  speciesData(state, getters, rootState, rootGetters) {
    // Preserve original data.
    var tempData = _.cloneDeep(state.speciesData)
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
  setSpeciesData(state, speciesData) {
    state.speciesData = speciesData
  },
  clear(state) {
    state.speciesData = undefined
    state.httpError = null
  },
  setHttpError(state, error) {
    state.httpError = error
  },
}

export const actions = {
  async fetch(context) {
    
    // let latLng = context.rootGetters['place/latLng']
    
    // let queryUrl =
    //   process.env.apiUrl +
    //   '/species/' +
    //   context.rootGetters['place/urlFragment'](true)

    // let returnedData = await $axios
    //   .get(queryUrl, { timeout: 60000 })
    //   .catch(err => {
    //     console.error(err)
    //     context.commit('setHttpError', 'no_data')
    //   })
    
    // temporary double-juggle to differentiate between
    // the (future) API return and the (nested) object
    // with the data we want
    let returnedData = species
    let rawSpecies = returnedData

    // Test for a valid & non-empty response object
    if (
      true
    ) {
      // Valid response.
      
      // Reshape
      let species = {}
      _.forEach(['mammal', 'bird', 'amphibian'], category => {
        species[category] = _.filter(rawSpecies, species => {
          return species.type === category
        })
      })

      context.commit('setSpeciesData', species)
    } else {
      // No demographics for this place.
      context.commit('setHttpError', 'no_data')
    }
  },
}
