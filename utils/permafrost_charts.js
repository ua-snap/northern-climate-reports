let models = { gfdlcm3: 'GFDL-CM3', ncarccsm4: 'NCAR-CCSM4' }
let scenarios = { rcp45: 'RCP 4.5', rcp85: 'RCP 8.5' }

let traceLabels = {
  gfdlcm3: {
    rcp45: 'RCP 4.5 (GFDL CM3)',
    rcp85: 'RCP 8.5 (GFDL CM3)',
  },
  ncarccsm4: {
    rcp45: 'RCP 4.5 (NCAR CCSM4)',
    rcp85: 'RCP 8.5 (NCAR CCSM4)',
  },
}

let symbols = {
  gfdlcm3: 'circle',
  ncarccsm4: 'square',
}

let colors = {
  gfdlcm3: {
    rcp45: 'rgb(230, 150, 150)',
    rcp85: 'rgb(190, 30, 30)',
  },
  ncarccsm4: {
    rcp45: 'rgb(150, 150, 230)',
    rcp85: 'rgb(30, 30, 190)',
  },
}

const getProjectedTrace = function (data, model, scenario, units, precision) {
  let eraLabels = Object.keys(data)
  let yData = []
  for (let era of Object.values(data)) {
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
      color: colors[model][scenario],
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
    })
  })
  return projectedTraces
}
