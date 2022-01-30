// This store manages permafrost data!

import _ from 'lodash'

// Helper functions
var convertReportData = function (permafrostData) {
  Object.keys(permafrostData['gipl']).forEach((year) => {
    permafrostData['gipl'][year] = this.convertPermafrostMeans(
      permafrostData['gipl'][year]
    )
  })
}

var convertPermafrostMeans = function (data) {
  return _.mapValuesDeep(
    data,
    (value, key, context) => {
      if (value == -9999) {
        return null
      } else if (key == 'alt') {
        // Convert to inches!
        return parseFloat((value * 39.37008).toFixed(1))
      } else if (key == 'magt') {
        return parseFloat((value * 1.8 + 32).toFixed(1))
      }
    },
    {
      leavesOnly: true,
    }
  )
}
var getAltThaw = function () {
  let freezing = this.units == 'metric' ? 0 : 32
  let thawData = {}
  let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
  let scenarios = ['rcp45', 'rcp85']
  let projectedYears = Object.keys(this.permafrostResults['gipl']).slice(1)

  let historicalAlt = this.permafrostResults['gipl']['1995']['cruts31'][
    'historical'
  ]['alt']
  let historicalMagt = this.permafrostResults['gipl']['1995']['cruts31'][
    'historical'
  ]['magt']

  if (historicalMagt < freezing) {
    thawData['1995'] = historicalAlt
  } else {
    thawData['1995'] = null
  }

  projectedYears.forEach((year) => {
    thawData[year] = {}
    models.forEach((model) => {
      thawData[year][model] = {}
    })
  })

  this.permafrostPresent = false
  models.forEach((model) => {
    scenarios.forEach((scenario) => {
      let previousMagt = historicalMagt
      projectedYears.forEach((year) => {
        let scenarioAlt = this.permafrostResults['gipl'][year][model][scenario][
          'alt'
        ]
        if (previousMagt < freezing) {
          thawData[year][model][scenario] = scenarioAlt
          this.permafrostPresent = true
        } else {
          thawData[year][model][scenario] = null
        }
        previousMagt = this.permafrostResults['gipl'][year][model][scenario][
          'magt'
        ]
      })
    })
  })
  this.$store.commit('setPermafrostPresent', this.permafrostPresent)

  return thawData
}
var getAltFreeze = function () {
  let freezing = this.units == 'metric' ? 0 : 32
  let freezeData = {}
  let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
  let scenarios = ['rcp45', 'rcp85']
  let projectedYears = Object.keys(this.permafrostResults['gipl']).slice(1)

  let historicalAlt = this.permafrostResults['gipl']['1995']['cruts31'][
    'historical'
  ]['alt']
  let historicalMagt = this.permafrostResults['gipl']['1995']['cruts31'][
    'historical'
  ]['magt']

  if (historicalMagt > freezing) {
    freezeData['1995'] = historicalAlt
  } else {
    freezeData['1995'] = null
  }

  projectedYears.forEach((year) => {
    freezeData[year] = {}
    models.forEach((model) => {
      freezeData[year][model] = {}
    })
  })

  this.permafrostDisappears = false
  models.forEach((model) => {
    scenarios.forEach((scenario) => {
      let previousMagt = historicalMagt
      projectedYears.forEach((year) => {
        let scenarioAlt = this.permafrostResults['gipl'][year][model][scenario][
          'alt'
        ]
        if (this.units == 'metric' && scenarioAlt <= 0.07) {
          freezeData[year][model][scenario] = null
        } else if (this.units == 'imperial' && scenarioAlt <= 2.8) {
          freezeData[year][model][scenario] = null
        } else if (previousMagt > freezing) {
          freezeData[year][model][scenario] = scenarioAlt
          this.permafrostDisappears = true
        } else {
          freezeData[year][model][scenario] = null
        }
        previousMagt = this.permafrostResults['gipl'][year][model][scenario][
          'magt'
        ]
      })
    })
  })
  this.$store.commit('setPermafrostDisappears', this.permafrostDisappears)

  return freezeData
}
var checkPermafrost = function () {
  let historicalAlt = this.permafrostResults['gipl']['1995']['cruts31'][
    'historical'
  ]['alt']
  this.showPermafrost = historicalAlt == null ? false : true
  if (this.permafrostPresent || this.permafrostDisappears) {
    this.showPermafrost = true
    this.$store.commit('setShowPermafrost', this.showPermafrost)
  }
}

// Store, namespaced as `permafrost/`
export const state = () => ({
  climateData: undefined,
})

export const getters = {
  getClimateData(state) {
    return state.climateData
  },
}

export const mutations = {
  setClimateData(state, climateData) {
    state.climateData = climateData
  },
}

export const actions = {
  async fetchClimateData(context) {
    // TODO: add error handling here for 404 (no data) etc.

    let queryUrl = process.env.apiUrl + '/taspr'
    // let permafrostQueryUrl = process.env.apiUrl + '/permafrost'

    // Determine the query type to perform.
    if (context.rootGetters.hucId) {
      // Fetch areal data by HUC.
      queryUrl += '/huc/' + context.rootGetters.hucId
    } else if (context.rootGetters.protectedAreaId) {
      queryUrl += '/protectedarea/' + context.rootGetters.protectedAreaId
    } else if (context.rootGetters.latLng) {
      queryUrl +=
        '/point/' +
        context.rootGetters.latLng[0] +
        '/' +
        context.rootGetters.latLng[1]
      // permafrostQueryUrl += '/point/' + context.rootGetters.latLng[0] + '/' + context.rootGetters.latLng[1]
      // this.showPermafrost = true
    } else {
      // Don't know what to query, this is an error situation.
      console.error("Unknown place type, can't fetch data")
      return
    }

    let climateData = await this.$http.$get(queryUrl)
    context.commit('setClimateData', climateData)

    // let permafrostData = await this.$http.$get(permafrostQueryUrl)

    // save copies!
    // context.commit('setPermafrostData', permafrostData)

    // this.units = 'imperial'
    // this.convertReportData()

    // if (this.showPermafrost) {
    //   this.altThawData = this.getAltThaw()
    //   this.altFreezeData = this.getAltFreeze()
    //   this.checkPermafrost()
    // }

    // context.commit('setShowPermafrost', this.showPermafrost)
  },
}
