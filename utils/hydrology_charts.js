let months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

let eras = [
  '1950-1959',
  '1960-1969',
  '1970-1979',
  '1980-1989',
  '1990-1999',
  '2000-2009',
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
  jan: 'January',
  feb: 'February',
  mar: 'March',
  apr: 'April',
  may: 'May',
  jun: 'June',
  jul: 'July',
  aug: 'August',
  sep: 'September',
  oct: 'October',
  nov: 'November',
  dec: 'December',
}

let symbols = {
  jan: 'circle',
  feb: 'square',
  mar: 'diamond',
  apr: 'circle',
  may: 'square',
  jun: 'diamond',
  jul: 'circle',
  aug: 'square',
  sep: 'diamond',
  oct: 'circle',
  nov: 'square',
  dec: 'diamond',
}

let colors = {
  jan: 'rgb(135,206,250)',
  feb: 'rgb(135,206,250)',
  mar: 'rgb(27,209,42)',
  apr: 'rgb(27,209,42)',
  may: 'rgb(27,209,42)',
  jun: 'rgb(234,45,16)',
  jul: 'rgb(234,45,16)',
  aug: 'rgb(234,45,16)',
  sep: 'rgb(239,239,19)',
  oct: 'rgb(239,239,19)',
  nov: 'rgb(239,239,19)',
  dec: 'rgb(135,206,250)',
}

const getProjectedTrace = function (
  data,
  variable,
  model,
  scenario,
  month,
  units,
  precision
) {
  let projectedTrace = {
    type: 'scatter',
    mode: 'markers',
    name: traceLabels[month],
    hoverinfo: 'x+y+z+text',
    hovertemplate: '%{y}' + units + ' <b>(%{customdata}' + units + ')</b>',
    marker: {
      symbol: Array(eras.length).fill(symbols[month]),
      size: 8,
      color: colors[month],
    },
    x: eras,
    y: [],
  }

  eras.forEach(era => {
    let value = data[variable][model][scenario][month][era]

    projectedTrace['y'].push(value)
  })

  projectedTrace['hovertemplate'] = '%{y:.' + precision + 'f}' + units

  return projectedTrace
}

export const getProjectedTraces = function (
  data,
  variable,
  model,
  scenario,
  units,
  precision = 1
) {
  let projectedTraces = []
  months.forEach(month => {
    let projectedTrace = getProjectedTrace(
      data,
      variable,
      model,
      scenario,
      month,
      units,
      precision
    )
    let nonNulls = projectedTrace['y'].filter(value => value != null)
    if (nonNulls.length > 0) {
      projectedTraces.push(projectedTrace)
    }
  })

  return projectedTraces
}
