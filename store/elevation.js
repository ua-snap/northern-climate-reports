import { convertToFeet } from '../utils/convert'

export const state = () => ({
  elevation: undefined,
})

export const getters = {
  elevation(state, getters, rootState, rootGetters) {
    // Preserve original data.
    var tempData = _.cloneDeep(state.elevation)
    if (!tempData) {
      return
    }
    if (rootGetters.units == 'imperial') {
      tempData = {
        mean: convertToFeet(tempData.mean),
        min: convertToFeet(tempData.min),
        max: convertToFeet(tempData.max),
      }
    }
    return {
      mean: tempData.mean.toLocaleString('en-US'),
      min: tempData.min.toLocaleString('en-US'),
      max: tempData.max.toLocaleString('en-US'),
    }
  },
}

export const mutations = {
  setElevation(state, elevation) {
    state.elevation = elevation
  },
}

export const actions = {
  async fetch(context) {
    // TODO: add error handling here for 404 (no data) etc.
    let queryUrl =
      process.env.apiUrl +
      '/elevation/' +
      context.rootGetters['place/urlFragment']
    let elevation = await this.$http.$get(queryUrl)
    context.commit('setElevation', elevation)
  },
}
