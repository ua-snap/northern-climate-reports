let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
let scenarios = ['rcp45', 'rcp85']

let eras = {
  1995: '1995',
  2025: '2011-2040',
  2050: '2036-2065',
  2075: '2061–2090',
  2095: '2086–2100',
}

let traceLabels = {
  gfdlcm3: {
    rcp45: 'RCP 4.5 (GFDL CM3)',
    rcp85: 'RCP 8.5 (GFDL CM3)',
  },
  gisse2r: {
    rcp45: 'RCP 4.5 (GISS E2-R)',
    rcp85: 'RCP 8.5 (GISS E2-R)',
  },
  ipslcm5alr: {
    rcp45: 'RCP 4.5 (IPSL CM5A-LR)',
    rcp85: 'RCP 8.5 (IPSL CM5A-LR)',
  },
  mricgcm3: {
    rcp45: 'RCP 4.5 (MRI CGCM3)',
    rcp85: 'RCP 8.5 (MRI CGCM3)',
  },
  ncarccsm4: {
    rcp45: 'RCP 4.5 (NCAR CCSM4)',
    rcp85: 'RCP 8.5 (NCAR CCSM4)',
  },
}

let symbols = {
  gfdlcm3: 'circle',
  gisse2r: 'square',
  ipslcm5alr: 'pentagon',
  mricgcm3: 'cross',
  ncarccsm4: 'x',
}

let colors = {
  gfdlcm3: {
    rcp45: 'rgb(230, 150, 150)',
    rcp85: 'rgb(190, 30, 30)',
  },
  gisse2r: {
    rcp45: 'rgb(150, 150, 230)',
    rcp85: 'rgb(30, 30, 190)',
  },
  ipslcm5alr: {
    rcp45: 'rgb(210, 210, 150)',
    rcp85: 'rgb(140, 140, 30)',
  },
  mricgcm3: {
    rcp45: 'rgb(250, 150, 30)',
    rcp85: 'rgb(210, 120, 30)',
  },
  ncarccsm4: {
    rcp45: 'rgb(210, 150, 210)',
    rcp85: 'rgb(140, 30, 140)',
  },
}
export const getHistoricalTrace = function (data, units, precision) {
  let eraLabels = Object.values(eras)
  let historicalYear = Object.keys(data).slice(0, 1)
  let historicalValue = data[historicalYear]
  if (historicalValue != null) {
    let historicalY = Array(eras.length).fill(null)
    historicalY[0] = historicalValue
    return {
      type: 'scatter',
      mode: 'markers',
      name: 'Historical',
      hoverinfo: 'x+y+z+text',
      hovertemplate: '%{y:.' + precision + 'f}' + units,
      marker: {
        symbol: 'diamond',
        size: 8,
        color: '#888888',
      },
      x: eraLabels,
      y: historicalY,
    }
  }
}

export const getHistoricalLine = function (data) {
  let historicalYear = Object.keys(data).slice(0, 1)
  let historicalValue = data[historicalYear]
  if (historicalValue != null) {
    return {
      type: 'rect',
      x0: 0,
      x1: 1,
      xref: 'paper',
      y0: historicalValue,
      y1: historicalValue,
      yref: 'y',
      line: {
        width: 2,
      },
      fillcolor: '#cccccc',
      opacity: 0.2,
    }
  }
}

const getProjectedTrace = function (
  data,
  model,
  scenario,
  units,
  precision,
  historicalValue,
  showDeltas = false
) {
  let eraLabels = Object.values(eras)
  let projectedYears = Object.keys(data).slice(1)
  let projectedTrace = {
    type: 'scatter',
    mode: 'markers',
    name: traceLabels[model][scenario],
    hoverinfo: 'x+y+z+text',
    marker: {
      symbol: Array(eraLabels.length).fill(symbols[model]),
      size: 8,
      color: colors[model][scenario],
    },
    x: eraLabels,
    y: [null],
    customdata: [null],
  }

  projectedYears.forEach(year => {
    let value = data[year][model][scenario]
    projectedTrace['y'].push(value)
    if (showDeltas) {
      let diff = value - historicalValue
      if (diff > 0) {
        diff = '+' + diff.toFixed(precision)
      } else {
        diff = diff.toFixed(precision)
      }
      projectedTrace['customdata'].push(diff)
    }
  })

  if (showDeltas) {
    projectedTrace['hovertemplate'] =
      '%{y}' + units + ' <b>(%{customdata}' + units + ')</b>'
  } else {
    projectedTrace['hovertemplate'] = '%{y:.' + precision + 'f}' + units
  }

  return projectedTrace
}

export const getProjectedTraces = function (data, units, precision) {
  let projectedTraces = []
  let historicalYear = Object.keys(data).slice(0, 1)
  let historicalValue = data[historicalYear]
  models.forEach(model => {
    scenarios.forEach(scenario => {
      let showDeltas = historicalValue != null ? true : false
      let eraLabels = Object.values(eras)
      let projectedTrace = getProjectedTrace(
        data,
        model,
        scenario,
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

export const detectEmptyColumns = function (data) {
  let emptyColumns = false
  let years = Object.keys(data)
  years.forEach(year => {
    let dataFound = _.findDeep(data[year], (value, key, parent) => {
      if (value != null) return true
    })
    if (dataFound == undefined) {
      emptyColumns = true
    }
  })
  return emptyColumns
}
