export const getAppPathFragment = function (type, id) {
  let path
  switch (type) {
    case 'huc':
      path = '/report/huc/' + id
      break
    case 'protected_area':
      path = '/report/protected_area/' + id
      break
    case 'community':
      path = '/report/community/' + id
      break;
    default:
      throw "Unknown path fragment type in utils/path.js"
  }
  return path
}
