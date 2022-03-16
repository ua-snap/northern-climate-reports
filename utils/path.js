export const getAppPathFragment = function (type, id) {
  let path
  console.log(path)
  switch (type) {
    case 'huc':
      path = '/report/area/' + id
      break
    case 'protected_area':
      path = '/report/area/' + id
      break
    case 'corporation':
      path = '/report/area/' + id
      break
    case 'climate_division':
      path = '/report/area/' + id
      break
    case 'ethnolinguistic_region':
      path = '/report/area/' + id
      break
    case 'community':
      path = '/report/community/' + id
      break;
    default:
      throw "Unknown path fragment type in utils/path.js"
  }
  return path
}
