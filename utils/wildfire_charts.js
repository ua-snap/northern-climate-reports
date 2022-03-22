let models = ['5modelAvg', 'GFDL-CM3', 'GISS-E2-R']
let scenarios = ['rcp45', 'rcp60', 'rcp85']

let historicalDecades = [
  '1950-1959',
  '1960-1969',
  '1970-1979',
  '1980-1989',
  '1990-1999',
  '2000-2008',
]

let projectedEras = ['2040-2069', '2070-2099']

let traceLabels = {
  '5modelAvg': {
    rcp45: 'RCP 4.5 (5modelAvg)',
    rcp60: 'RCP 6.0 (5modelAvg)',
    rcp85: 'RCP 8.5 (5modelAvg)',
  },
  'GFDL-CM3': {
    rcp45: 'RCP 4.5 (GFDL CM3)',
    rcp60: 'RCP 6.0 (GFDL CM3)',
    rcp85: 'RCP 8.5 (GFDL-CM3)',
  },
  'GISS-E2-R': {
    rcp45: 'RCP 4.5 (GISS E2-R)',
    rcp60: 'RCP 6.0 (GISS E2-R)',
    rcp85: 'RCP 8.5 (GISS E2-R)',
  },
}

let symbols = {
  '5modelAvg': 'circle',
  'GFDL-CM3': 'square',
  'GISS-E2-R': 'cross',
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
    hovertemplate: '%{y:.2f}',
    marker: {
      symbol: 'diamond',
      size: 8,
      color: '#888888',
    },
    x: historicalDecades,
    y: historicalY,
  }
}

const getProjectedBoxTrace = function (data, variable) {
  let projectedTrace = {
    type: 'box',
    mode: 'markers',
    name: 'Projected',
    x: [],
    y: [],
    boxpoints: false,
    hoverinfo: 'skip',
  }

  projectedEras.forEach(era => {
    models.forEach(model => {
      scenarios.forEach(scenario => {
        projectedTrace['x'].push(era)
        projectedTrace['y'].push(data[era][model][scenario][variable])
      })
    })
  })

  return projectedTrace
}

const getProjectedScatterTrace = function (
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
      symbol: Array(projectedEras.length).fill(symbols[model]),
      size: 8,
      color: colors[model][scenario],
    },
    x: projectedEras,
    y: [],
    customdata: [],
  }

  projectedEras.forEach(era => {
    let value = data[era][model][scenario][variable]
    projectedTrace['y'].push(value)
    let diff = value - historicalValue
    if (diff > 0) {
      diff = '+' + diff.toFixed(2)
    } else {
      diff = diff.toFixed(2)
    }
    projectedTrace['customdata'].push(diff)
  })

  projectedTrace['hovertemplate'] = '%{y:.2f} <b>(%{customdata})</b>'

  return projectedTrace
}

export const getProjectedTraces = function (data, variable, plotType = 'box') {
  let projectedTraces = []
  let historicalAverage =
    data['1950-2008']['CRU-TS40']['CRU_historical'][variable]
  if (plotType == 'box') {
    let projectedTrace = getProjectedBoxTrace(data, variable)
    projectedTraces.push(projectedTrace)
  } else {
    models.forEach(model => {
      scenarios.forEach(scenario => {
        let projectedTrace = getProjectedScatterTrace(
          data,
          model,
          scenario,
          variable,
          historicalAverage
        )
        projectedTraces.push(projectedTrace)
      })
    })
  }
  return projectedTraces
}

export const allZeros = function (data, variable) {
  let displayedValues = []

  historicalDecades.forEach(decade => {
    displayedValues.push(data[decade]['CRU-TS40']['CRU_historical'][variable])
  })

  projectedEras.forEach(era => {
    models.forEach(model => {
      scenarios.forEach(scenario => {
        displayedValues.push(data[era][model][scenario][variable])
      })
    })
  })

  return displayedValues.every(value => value == 0)
}
