// Meters to feet
export const convertToFeet = function (value) {
  return Math.round(value * 3.28084)
}

export const convertToInches = function (
  permafrostData,
  fromUnit,
  keys = null
) {
  if (!permafrostData) {
    return
  }
  let nodata = [-9999]
  let t = _.mapValuesDeep(
    permafrostData,
    (value, key, context) => {
      // If keys array is provided, convert only those keys.
      if (keys != null && !keys.includes(key)) {
        return value
      }
      // Trap edge cases where the value isn't 0 (usually valid)
      // but is equivalent to a missing/nodata value
      if (value !== 0 && (!value || nodata.includes(value))) {
        return null
      }
      switch (fromUnit) {
        // Convert from millimeters.
        case 'mm':
          return parseFloat((value * 0.03937008).toFixed(1))
        // Convert from meters.
        case 'm':
          return parseFloat((value * 39.37008).toFixed(1))
      }
    },
    {
      leavesOnly: true,
    }
  )
  return t
}

export const convertToFahrenheit = function (
  permafrostData,
  fromUnit,
  keys = null
) {
  if (!permafrostData) {
    return
  }
  let nodata = [-9999]
  let t = _.mapValuesDeep(
    permafrostData,
    (value, key, context) => {
      // If keys array is provided, convert only those keys.
      if (keys != null && !keys.includes(key)) {
        return value
      }
      // Trap edge cases where the value isn't 0 (usually valid)
      // but is equivalent to a missing/nodata value
      if (value !== 0 && (!value || nodata.includes(value))) {
        return null
      }
      switch (fromUnit) {
        // Convert from Celsius.
        case 'c':
          return parseFloat((value * 1.8 + 32).toFixed(1))
      }
    },
    {
      leavesOnly: true,
    }
  )
  return t
}

export const convertToPercent = function (wildfireData) {
  return _.mapValuesDeep(
    wildfireData,
    (value, key) => {
      return key != 'huc_id' ? value * 100 : value
    },
    {
      leavesOnly: true,
    }
  )
}
