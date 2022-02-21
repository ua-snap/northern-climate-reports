let models = [
  '5modelAvg',
  'GFDL-CM3',
  'GISS-E2-R',
  'IPSL-CM5A-LR',
  'MRI-CGCM3',
  'NCAR-CCSM4',
]
let scenarios = ['rcp45', 'rcp60', 'rcp85']

let historicalDecades = [
  '1950-1959',
  '1960-1969',
  '1970-1979',
  '1980-1989',
  '1990-1999',
  '2000-2008',
]

let projectedDecades = [
  '2010-2019',
  '2020-2029',
  '2030-2039',
  '2040-2049',
  '2050-2059',
  '2060-2069',
  '2070-2079',
  '2080-2089',
  '2090-2099',
]

let traceLabels = {
  '5modelAvg': {
    rcp45: 'RCP 4.5 (5modelAvg)',
    rcp60: 'RCP 6.0 (5modelAvg)',
    rcp85: 'RCP 8.5 (5modelAvg)',
  },
  'GFDL-CM3': {
    rcp45: 'RCP 4.5 (GFDL-CM3)',
    rcp60: 'RCP 6.0 (GFDL-CM3)',
    rcp85: 'RCP 8.5 (GFDL-CM3)',
  },
  'GISS-E2-R': {
    rcp45: 'RCP 4.5 (GISS-E2-R)',
    rcp60: 'RCP 6.0 (GISS-E2-R)',
    rcp85: 'RCP 8.5 (GISS-E2-R)',
  },
  'IPSL-CM5A-LR': {
    rcp45: 'RCP 4.5 (IPSL-CM5A-LR)',
    rcp60: 'RCP 6.0 (IPSL-CM5A-LR)',
    rcp85: 'RCP 8.5 (IPSL-CM5A-LR)',
  },
  'MRI-CGCM3': {
    rcp45: 'RCP 4.5 (MRI-CGCM3)',
    rcp60: 'RCP 6.0 (MRI-CGCM3)',
    rcp85: 'RCP 8.5 (MRI-CGCM3)',
  },
  'NCAR-CCSM4': {
    rcp45: 'RCP 4.5 (NCAR-CCSM4)',
    rcp60: 'RCP 6.0 (NCAR-CCSM4)',
    rcp85: 'RCP 8.5 (NCAR-CCSM4)',
  },
}

let symbols = {
  '5modelAvg': 'circle',
  'GFDL-CM3': 'square',
  'GISS-E2-R': 'cross',
  'IPSL-CM5A-LR': 'x',
  'MRI-CGCM3': 'pentagon',
  'NCAR-CCSM4': 'hexagon',
}

let colors = {
  '5modelAvg': {
    rcp45: 'rgb(230, 150, 150)',
    rcp60: 'rgb(210, 90, 90)',
    rcp85: 'rgb(190, 30, 30)',
  },
  'GFDL-CM3': {
    rcp45: 'rgb(150, 150, 230)',
    rcp60: 'rgb(90, 90, 210)',
    rcp85: 'rgb(30, 30, 190)',
  },
  'GISS-E2-R': {
    rcp45: 'rgb(210, 210, 150)',
    rcp60: 'rgb(180, 180, 90)',
    rcp85: 'rgb(140, 140, 30)',
  },
  'IPSL-CM5A-LR': {
    rcp45: 'rgb(250, 150, 30)',
    rcp60: 'rgb(230, 145, 30)',
    rcp85: 'rgb(210, 120, 30)',
  },
  'MRI-CGCM3': {
    rcp45: 'rgb(210, 150, 210)',
    rcp60: 'rgb(180, 90, 180)',
    rcp85: 'rgb(140, 30, 140)',
  },
  'NCAR-CCSM4': {
    rcp45: 'rgb(150, 210, 150)',
    rcp45: 'rgb(90, 180, 90)',
    rcp85: 'rgb(30, 140, 30)',
  },
}

export const getHistoricalTrace = function (data, variable) {
  let historicalY = historicalDecades.map(
    decade => data[decade]['CRU-TS40']['CRU_historical'][variable]
  )
  return {
    type: 'scatter',
    mode: 'markers',
    name: 'Historical',
    hoverinfo: 'x+y+z+text',
    hovertemplate: '%{y:.4f}',
    marker: {
      symbol: 'diamond',
      size: 8,
      color: '#888888',
    },
    x: historicalDecades,
    y: historicalY,
  }
}

const getProjectedTrace = function (
  data,
  model,
  scenario,
  variable,
  historicalValue
) {
  let projectedTrace = {
    type: 'scatter',
    mode: 'markers',
    name: traceLabels[model][scenario],
    hoverinfo: 'x+y+z+text',
    marker: {
      symbol: Array(projectedDecades.length).fill(symbols[model]),
      size: 8,
      color: colors[model][scenario],
    },
    x: projectedDecades,
    y: [],
    customdata: [],
  }

  projectedDecades.forEach(decade => {
    let value = data[decade][model][scenario][variable]
    projectedTrace['y'].push(value)
    let diff = value - historicalValue
    if (diff > 0) {
      diff = '+' + diff.toFixed(4)
    } else {
      diff = diff.toFixed(4)
    }
    projectedTrace['customdata'].push(diff)
  })

  projectedTrace['hovertemplate'] = '%{y:.4f} <b>(%{customdata})</b>'

  return projectedTrace
}

export const getProjectedTraces = function (data, variable) {
  let projectedTraces = []
  let historicalAverage =
    data['1950-2008']['CRU-TS40']['CRU_historical'][variable]
  models.forEach(model => {
    scenarios.forEach(scenario => {
      let projectedTrace = getProjectedTrace(
        data,
        model,
        scenario,
        variable,
        historicalAverage
      )
      projectedTraces.push(projectedTrace)
    })
  })
  return projectedTraces
}
