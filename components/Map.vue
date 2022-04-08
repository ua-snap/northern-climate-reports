<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
#map {
  min-height: 50vw;
  height: 100%;
  width: 100%;
}

::v-deep .community-label {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem;
  font-size: 16pt;
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import * as turf from '@turf/turf'
import { getAppPathFragment } from '~/utils/path.js'
import iem from '!raw-loader!../assets/iem.geojson'
const iemJson = JSON.parse(iem)

// Set up styles for managing polygon highlights, etc.
var protectedAreaDefaultStyle = {
  color: '#20a003',
  fillOpacity: 0.2,
}

var protectedAreaHighlightedStyle = {
  color: '#fcf1b5',
  fillOpacity: 0.9,
}

var hucDefaultStyle = {
  color: '#09a3ea',
  fillOpacity: 0.2,
}

var hucHighlightedStyle = {
  color: '#fcf1b5',
  fillOpacity: 0.9,
}

export default {
  name: 'Map',
  computed: {
    ...mapGetters({
      searchResults: 'place/searchResults',
      mapSearchIsVisible: 'mapSearchIsVisible',
      latLng: 'place/latLng',
    }),
  },
  mounted() {
    this.map = L.map('map', this.getBaseMapAndLayers())

    // The map is either being drawn for a broad search interface,
    // or to show the results of a search.
    if (this.mapSearchIsVisible && this.searchResults) {
      this.drawSearchResults()
    } else {
      new this.$L.Control.Zoom({ position: 'topright' }).addTo(this.map)

      // Instantiate handleMapClick function to allow for onEachFeature
      // function to access it.
      let hmc = this.handleMapClick

      L.geoJSON(iemJson, {
        onEachFeature: function (feature, layer) {
          layer.on('click', hmc)
        },
        style: {
          opacity: 0.0,
          fillOpacity: 0.0,
        },
      }).addTo(this.map)
    }
  },
  data() {
    return {
      // Currently selected lat/lon on the map.
      lat: 0,
      lng: 0,
      latlng: undefined,
      minimized: false,
    }
  },
  methods: {
    // Handle a mouse click on the map when it's in full view / default mode,
    // trigger a search event!
    handleMapClick(event) {
      this.$router.push({
        path:
          '/search/' +
          event.latlng.lat.toFixed(2) +
          '/' +
          event.latlng.lng.toFixed(2),
        hash: '#map-search',
      })
    },
    getBaseMapAndLayers() {
      var baseLayer = new this.$L.tileLayer.wms(process.env.geoserverUrl, {
        transparent: true,
        srs: 'EPSG:3338',
        format: 'image/png',
        version: '1.3.0',
        layers: [
          'atlas_mapproxy:alaska_osm_retina',
          'shadow_mask:iem_with_ak_aleutians_symmetric_difference',
        ],
      })

      // Projection definition.
      var proj = new this.$L.Proj.CRS(
        'EPSG:3338',
        '+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
        {
          resolutions: [4096, 2048, 1024, 512, 256, 128, 64],
        }
      )

      // Map base configuration
      var config = {
        zoom: 1,
        minZoom: 1,
        maxZoom: 6,
        center: [64.7, -155],
        scrollWheelZoom: false,
        crs: proj,
        continuousWorld: true,
        zoomControl: false,
        doubleClickZoom: false,
        attributionControl: false,
        layers: [baseLayer],
      }

      return config
    },
    drawSearchResults() {
      // This can be triggered before the data are ready;
      // guard!
      if (this.searchResults) {
        // Clear prior results, if any.
        if (this.layerGroup || this.communityLayerGroup) {
          this.map.removeLayer(this.layerGroup)
          this.map.removeLayer(this.communityLayerGroup)
        }

        // Zoom to the region where the user clicked,
        // Let a moment pass so the invalidation works properly
        // with animated CSS -- then, add the GeoJSON / Markers to the map!
        setTimeout(() => {
          this.map.invalidateSize(true)
          this.map.fitBounds([
            [
              this.searchResults.total_bounds['ymin'],
              this.searchResults.total_bounds['xmin'],
            ],
            [
              this.searchResults.total_bounds['ymax'],
              this.searchResults.total_bounds['xmax'],
            ],
          ])
          // Add marker where the user clicked.
          this.marker = L.marker(this.latLng).addTo(this.map)

          // LayerGroup for the GeoJSON and stuff so it's easy to remove.
          // This property is non-reactive.
          this.layerGroup = new L.LayerGroup()
          this.layerGroup.addTo(this.map)

          this.communityLayerGroup = new L.LayerGroup()
          this.communityLayerGroup.addTo(this.map)
          this.communityLayerGroup.setZIndex(0)

          // Add GeoJSON for Protected Areas, along
          // with event handlers; it's a little messy
          // to have things bound here instead of factored into
          // other methods on this object but we need to
          // bind the `this` context throughout.
          _.each(this.searchResults.areas, area => {
            // Skip all but HUCs and Protected Areas, the other polygons
            // get so big they cause the map interface to work poorly.
            if (area.type != 'huc' && area.type != 'protected_area') {
              return
            }

            let defaultStyle, highlightedStyle
            // Set up the layer styles for HUC/Protected area
            if(area.type == 'huc') {
              defaultStyle = hucDefaultStyle
              highlightedStyle = hucHighlightedStyle
            } else if(area.type == 'protected_area') {
              defaultStyle = protectedAreaDefaultStyle
              highlightedStyle = protectedAreaHighlightedStyle
            }

            area.geojson.properties = {
              id: area.id,
              name: area.name,
              type: area.type,
            }
            this.layerGroup.addLayer(
              L.geoJSON(area.geojson, {
                style: defaultStyle,
                onEachFeature: (feature, layer) => {
                  layer.bindTooltip(feature.properties.name)
                  layer.on({
                    mouseover: e => {
                      let layer = e.target
                      layer.bringToFront()
                      layer.setStyle(highlightedStyle)
                      layer.openTooltip()
                    },
                    mouseout: e => {
                      let layer = e.target
                      layer.setStyle(defaultStyle)
                      layer.closeTooltip()
                    },
                    click: e => {
                      let layer = e.target
                      this.$router.push({
                        path: getAppPathFragment(
                          feature.properties.type,
                          feature.properties.id
                        ),
                        hash: '#results',
                      })
                    },
                  })
                },
              })
            )
          })

          var geojsonMarkerOptions = {
            radius: 8,
            fillColor: '#357a76',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
          }

          // Add points for each matching community
          _.each(this.searchResults.communities, community => {
            let communityName = community.name
            if (community.alt_name) {
              communityName += ' (' + community.alt_name + ')'
            }
            L.circleMarker(
              [community.latitude, community.longitude],
              geojsonMarkerOptions
            )
              .bindTooltip(communityName)
              .on('click', e => {
                this.$router.push({
                  path: getAppPathFragment('community', community.id),
                  hash: '#results',
                })
              })
              .addTo(this.communityLayerGroup)
          })
        }, 50)
      }
    },
  },
  watch: {
    searchResults: function () {
      this.drawSearchResults()
    },
  },
}
</script>
