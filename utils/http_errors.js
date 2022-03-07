export let httpErrors = {
  bad_request: 'Bad request',
  no_data: 'No data at this location',
  invalid_coordinates: 'Invalid coordinates',
  timeout: 'Server timeout',
  server_error: 'Server error',
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
