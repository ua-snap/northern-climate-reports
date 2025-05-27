export let httpErrors = {
  bad_request: 'Data request was not understood',
  no_data: 'No data at this location',
  invalid_coordinates:
    'Provided coordinates or area are not included in coverage',
  timeout: 'Data request timed out',
  server_error: 'A problem occurred while requesting data',
  low_population:
    'The adult population for the requested community is less than 50 people. To protect privacy of community members, no data is shared for this location.',
}

export const getHttpError = function (error) {
  if (error.response != undefined) {
    switch (error.response.status) {
      case 400:
        return 'bad_request'
      case 404:
        return 'no_data'
      case 422:
        return 'invalid_coordinates'
      case 500:
        return 'server_error'
      default:
        return 'server_error'
    }
  } else if (error.code != undefined) {
    return 'timeout'
  }
  return 'server_error'
}
