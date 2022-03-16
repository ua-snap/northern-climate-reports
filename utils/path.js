export const getAppPathFragment = function (type, id) {
  let path
  if (type == 'community') {
    path = '/report/community/' + id
  } else if (type =='huc' || type == 'protected_area' || type == 'corporation' || type == 'climate_division' || type == 'ethnolinguistic_region') {
    path = '/report/area/' + id
  } else {
    throw "Unknown path fragment type in utils/path.js"
  }
  return path
}
