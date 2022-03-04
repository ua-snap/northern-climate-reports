export const getBaseMapAndLayers = function () {
  // Projection definition.
  var proj = new this.$L.Proj.CRS(
    'EPSG:3338',
    '+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
    {
      resolutions: [4096, 2048, 1024, 512, 256, 128, 64],
    }
  )
  this.baseLayer = this.getBaseLayer()
  // Map base configuration
  var config = {
    zoom: 1,
    minZoom: 0,
    maxZoom: 2,
    center: [64.7, -155],
    scrollWheelZoom: false,
    dragging: false,
    zoomControl: false,
    doubleClickZoom: false,
    attributionControl: false,
    layers: [this.baseLayer],
    crs: proj,
  }
  return config
}

export const addGeoJSONtoMap = function () {
  if (this.geoJSON) {
    this.geoJSONLayer = L.geoJSON(this.geoJSON, {
      style: {
        color: '#444444',
        weight: 2,
        fillOpacity: 0.0,
      },
    }).addTo(this.map)
    this.map.fitBounds(this.geoJSONLayer.getBounds())
  }
}
