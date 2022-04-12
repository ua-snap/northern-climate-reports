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

export const getLayout = function (title, yAxisLabel, height = 500) {
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
    },
    margin: {
      b: 120,
    },
    height: height,
    dragmode: false,
  }
}

export const getFooter = function (footerLines, layout) {
  let footerOffset = 0.05 * footerLines.length
  let footerY = -0.2 - footerOffset
  let yAxisAnnotationX = -0.04
  if (window.innerWidth < 1250) {
    layout['xaxis'] = {
      tickangle: 45,
    }
    layout['margin']['b'] = 160
    footerY = -0.4 - footerOffset
    yAxisAnnotationX = -0.06
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
