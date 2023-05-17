let models = { gfdlcm3: 'GFDL-CM3', ncarccsm4: 'NCAR-CCSM4' }
let scenarios = { rcp45: 'RCP 4.5', rcp85: 'RCP 8.5' }

let eras = {
  0: '2021-2039',
  1: '2040-2069',
  2: '2070–2099',
}

let traceLabels = {
  gfdlcm3: {
    rcp45: 'Depth (GFDL CM3 at RCP 4.5)',
    rcp85: 'Depth (GFDL CM3 at RCP 8.5)',
  },
  ncarccsm4: {
    rcp45: 'Depth (NCAR CCSM4 at RCP 4.5)',
    rcp85: 'Depth (NCAR CCSM4 at RCP 8.5)',
  },
}

let symbols = {
  gfdlcm3: 'circle',
  ncarccsm4: 'x',
}

let colors = {
  rcp45: 'rgb(67, 147, 195)',
  rcp85: 'rgb(214, 96, 76)',
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

const getProjectedTrace = function (data, model, scenario, units, precision) {
  let eraLabels = Object.values(eras)
  let yData = []
  for (let era of data) {
    yData.push(era[models[model]][scenario]['gipl1kmmean']['permafrosttop'])
  }
  let projectedTrace = {
    type: 'scatter',
    mode: 'markers',
    name: traceLabels[model][scenario],
    hoverinfo: 'x+y+z+text',
    marker: {
      symbol: symbols[model],
      size: 8,
      color: colors[scenario],
    },
    x: eraLabels,
    y: yData,
  }

  projectedTrace['hovertemplate'] = '%{y:.' + precision + 'f}' + units
  return projectedTrace
}

export const getProjectedTraces = function (data, units, precision) {
  let projectedTraces = []
  Object.keys(models).forEach(model => {
    Object.keys(scenarios).forEach(scenario => {
      let projectedTrace = getProjectedTrace(
        data,
        model,
        scenario,
        units,
        precision
      )
      projectedTraces.push(projectedTrace)
      // let nonNulls = projectedTrace['y'].filter(value => value != null)
      // if (nonNulls.length > 0) {
      //   projectedTraces.push(projectedTrace)
      // }
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
