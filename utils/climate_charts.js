let models = ['5modelAvg', 'MRI-CGCM3', 'CCSM4']
let scenarios = ['rcp45', 'rcp60', 'rcp85']
let historicalEra = '1950_2009'

let decades = [
  '2010_2019',
  '2020_2029',
  '2030_2039',
  '2040_2049',
  '2050_2059',
  '2060_2069',
  '2070_2079',
  '2080_2089',
  '2090_2099',
]

let traceLabels = {
  '5modelAvg': {
    rcp45: 'RCP 4.5 (5 Model Avg.)',
    rcp60: 'RCP 6.0 (5 Model Avg.)',
    rcp85: 'RCP 8.5 (5 Model Avg.)',
  },
  'MRI-CGCM3': {
    rcp45: 'RCP 4.5 (MRI CGCM3)',
    rcp60: 'RCP 6.0 (MRI CGCM3)',
    rcp85: 'RCP 8.5 (MRI CGCM3)',
  },
  CCSM4: {
    rcp45: 'RCP 4.5 (NCAR CCSM4)',
    rcp60: 'RCP 6.0 (NCAR CCSM4)',
    rcp85: 'RCP 8.5 (NCAR CCSM4)',
  },
}

let symbols = {
  '5modelAvg': 'circle',
  'MRI-CGCM3': 'square',
  CCSM4: 'diamond',
}

let colors = {
  '5modelAvg': {
    rcp45: 'rgb(230, 150, 150)',
    rcp60: 'rgb(210, 90, 90)',
    rcp85: 'rgb(190, 30, 30)',
  },
  'MRI-CGCM3': {
    rcp45: 'rgb(150, 150, 230)',
    rcp60: 'rgb(90, 90, 210)',
    rcp85: 'rgb(30, 30, 190)',
  },
  CCSM4: {
    rcp45: 'rgb(210, 210, 150)',
    rcp60: 'rgb(180, 180, 90)',
    rcp85: 'rgb(140, 140, 30)',
  },
}

export const seasons = {
  DJF: 'December-February',
  MAM: 'March-May',
  JJA: 'June-August',
  SON: 'September-November',
}

export const getHistoricalTrace = function (data, season, variable) {
  let historicalData =
    data[historicalEra][season]['CRU-TS40']['CRU_historical'][variable]
  let tickLabel = historicalEra.replace('_', '-')
  return {
    type: 'box',
    name: 'Historical (1950-2009)',
    x: [tickLabel],
    q1: [historicalData['q1']],
    median: [historicalData['median']],
    q3: [historicalData['q3']],
    lowerfence: [historicalData['min']],
    upperfence: [historicalData['max']],
    marker: {
      color: '#888888',
    },
    fillcolor: '#cccccc',
    hoverinfo: 'skip',
  }
}

export const getHistoricalRegion = function (data, season, variable) {
  return {
    type: 'rect',
    x0: 0,
    x1: 1,
    xref: 'paper',
    y0: data['1950_2009'][season]['CRU-TS40']['CRU_historical'][variable]['q1'],
    y1: data['1950_2009'][season]['CRU-TS40']['CRU_historical'][variable]['q3'],
    yref: 'y',
    line: {
      width: 0,
    },
    fillcolor: '#cccccc',
    opacity: 0.2,
  }
}

const getProjectedTrace = function (
  data,
  season,
  model,
  scenario,
  variable,
  units,
  precision,
  historicalValue,
  showDeltas = false
) {
  let decadeLabels = decades.map(decade => decade.replace('_', '-'))
  let projectedTrace = {
    type: 'scatter',
    mode: 'markers',
    name: traceLabels[model][scenario],
    hoverinfo: 'x+y+z+text',
    hovertemplate: '%{y}' + units + ' <b>(%{customdata}' + units + ')</b>',
    marker: {
      symbol: Array(decades.length).fill(symbols[model]),
      size: 8,
      color: colors[model][scenario],
    },
    x: decadeLabels,
    y: [],
    customdata: [],
  }

  decades.forEach(decade => {
    let value = data[decade][season][model][scenario][variable]
    let historicalValue =
      data['1950_2009'][season]['CRU-TS40']['CRU_historical'][variable][
        'median'
      ]
    let diff = value - historicalValue
    if (diff > 0) {
      diff = '+' + diff.toFixed(1)
    } else {
      diff = diff.toFixed(1)
    }
    projectedTrace['y'].push(value)
    projectedTrace['customdata'].push(diff)
  })

  if (showDeltas) {
    projectedTrace['hovertemplate'] =
      '%{y}' + units + ' <b>(%{customdata}' + units + ')</b>'
  } else {
    projectedTrace['hovertemplate'] = '%{y:.' + precision + 'f}' + units
  }

  return projectedTrace
}

export const getProjectedTraces = function (
  data,
  season,
  variable,
  units,
  precision = 1
) {
  let projectedTraces = []
  let historicalYear = Object.keys(data).slice(0, 1)
  let historicalValue = data[historicalYear]
  models.forEach(model => {
    scenarios.forEach(scenario => {
      let showDeltas = historicalValue != null ? true : false
      let projectedTrace = getProjectedTrace(
        data,
        season,
        model,
        scenario,
        variable,
        units,
        precision,
        historicalValue,
        showDeltas
      )
      let nonNulls = projectedTrace['y'].filter(value => value != null)
      if (nonNulls.length > 0) {
        projectedTraces.push(projectedTrace)
      }
    })
  })
  return projectedTraces
}
