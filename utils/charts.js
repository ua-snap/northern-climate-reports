export const getPlotSettings = function () {
  return {
    responsive: true, // changes the height / width dynamically for charts
    displayModeBar: true, // always show the camera icon
    displaylogo: false,
    modeBarButtonsToRemove: [
      'zoom2d',
      'pan2d',
      'select2d',
      'lasso2d',
      'zoomIn2d',
      'zoomOut2d',
      'autoScale2d',
      'resetScale2d',
    ],
  }
}

export const buildTitle = function (params) {
  let dataLabel = params['dataLabel']
  let dateRange = params['dateRange']
  let place = params['place']
  let huc12Id = params['huc12Id']
  let season = params['season']
  let model = params['model']
  let scenario = params['scenario']

  let title = dataLabel + ',<br>'
  let huc12Label = ''
  if (huc12Id) {
    huc12Label = '(HUC12 ID ' + huc12Id + ')'
  }
  let totalLength = place.length + huc12Label.length + dateRange.length

  if (season) {
    totalLength += season.length
  }

  if (model) {
    totalLength += model.length
  }

  if (scenario) {
    totalLength += scenario.length
  }

  if (totalLength > 60) {
    title += place
    if (huc12Label != '') {
      title += '<br>' + huc12Label + ', '
    } else {
      title += ',<br>'
    }
    title += dateRange
  } else if (totalLength > 50) {
    title += place
    if (huc12Label != '') {
      title += ' ' + huc12Label
    }
    title += ',<br>' + dateRange
  } else {
    title += place
    if (huc12Label != '') {
      title += ' ' + huc12Label
    }
    title += ', ' + dateRange
  }

  if (season) {
    title += ', ' + season
  }

  if (model) title += ', ' + model

  if (scenario) title += ', ' + scenario

  return title
}

export const getLayout = function (title, yAxisLabel) {
  let titleLineCount = title.split('<br>').length
  let titleOffset = 40 * titleLineCount
  let chartHeight = 450 + titleOffset

  return {
    xaxis: {
      showgrid: false,
    },
    yaxis: {
      title: {
        text: yAxisLabel,
        font: {
          size: 18,
        },
        standoff: 30,
      },
      zeroline: false,
      hoverformat: '.1f',
    },
    title: {
      text: title,
      font: {
        size: 24,
      },
      y: 0.93 - titleLineCount / 100,
    },
    shapes: [],
    hovermode: 'x unified',
    hoverlabel: {
      namelength: -1,
    },
    annotations: [],
    showlegend: true,
    legend: {
      x: 1.03,
      font: {
        family: 'sans-serif',
      },
    },
    margin: {
      t: 30 + titleOffset,
      b: 120,
    },
    height: chartHeight,
    dragmode: false,
  }
}

export const getFooter = function (footerLines, layout, dynamicWidth = true) {
  let footerOffset = 0.05 * footerLines.length
  let footerY = -0.2 - footerOffset
  let yAxisAnnotationX = -0.04

  if (dynamicWidth) {
    if (window.innerWidth < 1250) {
      layout['xaxis'] = {
        tickangle: 45,
      }
      layout['margin']['b'] = 160
      footerY = -0.4 - footerOffset
      yAxisAnnotationX = -0.06
    }
  }

  return {
    x: 0.5,
    y: footerY,
    xref: 'paper',
    yref: 'paper',
    showarrow: false,
    text: footerLines.join('<br />'),
  }
}
