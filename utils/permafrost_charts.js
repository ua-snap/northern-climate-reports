let models = { gfdlcm3: 'GFDL-CM3', ncarccsm4: 'NCAR-CCSM4' }
let modelNames = ['GFDL-CM3', 'NCAR-CCSM4']
let mmms = { max: 'gipl1kmmax', mean: 'gipl1kmmean', min: 'gipl1kmmin' }

let eras = {
  0: '2021-2039',
  1: '2040-2069',
  2: '2070–2099',
}

let traceLabels = {
  gfdlcm3: {
    max: 'Maximum depth (GFDL CM3)',
    mean: 'Mean depth (GFDL CM3)',
    min: 'Minimum depth (GFDL CM3)',
  },
  ncarccsm4: {
    max: 'Maximum depth (NCAR CCSM4)',
    mean: 'Mean depth (NCAR CCSM4)',
    min: 'Minimum depth (NCAR CCSM4)',
  },
}

let symbols = {
  gfdlcm3: 'circle',
  ncarccsm4: 'x',
}

let colors = {
  gfdlcm3: {
    max: 'rgb(230, 150, 150)',
    mean: 'rgb(150, 150, 230)',
    min: 'rgb(190, 30, 30)',
  },
  ncarccsm4: {
    max: 'rgb(210, 150, 210)',
    mean: 'rgb(140, 30, 140)',
    min: 'rgb(30, 30, 190)',
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

const getProjectedTrace = function (data, era, model, mmm, units, precision) {
  console.log(data[models[model]][mmms[mmm]]['permafrosttop'])
  let eraLabel = eras[era]
  let projectedTrace = {
    type: 'scatter',
    mode: 'markers',
    name: traceLabels[model][mmm],
    hoverinfo: 'x+y+z+text',
    marker: {
      symbol: symbols[model],
      size: 8,
      color: colors[model][mmm],
    },
    x: [eraLabel],
    y: [data[models[model]][mmms[mmm]]['permafrosttop']],
  }

  projectedTrace['hovertemplate'] = '%{y:.' + precision + 'f}' + units
  console.log(projectedTrace)
  return projectedTrace
}

export const getProjectedTraces = function (data, units, precision) {
  let projectedTraces = []
  Object.keys(eras).forEach(era => {
    Object.keys(models).forEach(model => {
      Object.keys(mmms).forEach(mmm => {
        let projectedTrace = getProjectedTrace(
          data[era],
          era,
          model,
          mmm,
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
