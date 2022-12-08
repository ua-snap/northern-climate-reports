<template>
  <div class="latlon-picker--wrapper is-hidden-touch">
    <div class="content">
      <h4 class="title is-5">Find a place by latitude & longitude</h4>
      <p>
        Enter a specific lat/lon combo below. Decimal degrees or DMS formats are
        accepted, i.e. <code>65.24, -142.22</code> or
        <code>58° 18' 0" N, 134° 24' 57.6" W</code>.
      </p>

      <div class="columns">
        <div class="column is-two-thirds">
          <b-field :type="getFieldStatus" :message="getFieldMessage">
            <b-input
              v-model="latlngInput"
              placeholder="65.24, -142.22"
            ></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-button type="is-info" :disabled="!isValid" @click="search"
            >Go</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import parseDMS from 'parse-dms'
import * as turf from '@turf/turf'
import iem from '!raw-loader!../assets/iem.geojson'
const iemJson = JSON.parse(iem)

export default {
  name: 'LatLngSelector',
  data() {
    return {
      latlngInput: '',
      fieldMessage: '',
    }
  },
  computed: {
    // Returns the valid lat/lng, as an object,
    // { lat: lat, lng: lng }.  If not valid, returns False.
    latLng() {
      return this.validate()
    },

    isValid() {
      return this.latLng // true/false
    },

    // These validations aren't great, but they're a start.
    // Don't bug the user until at least 8 chars are in, roughly
    // the minimum for a valid combo.
    getFieldStatus() {
      if (this.latlngInput.length < 8 || this.isValid) {
        return '' // OK
      } else {
        return 'is-danger' // not OK
      }
    },
    getFieldMessage() {
      if (this.latlngInput.length < 8 || this.isValid) {
        return ''
      } else {
        return this.fieldMessage
      }
    },
  },
  methods: {
    search() {
      this.$router.push({
        path: '/report/' + this.latLng.lat + '/' + this.latLng.lng,
        hash: '#results',
      })
    },
    validate() {
      let parsedDms = undefined
      let latLng = false

      if (!this.latlngInput) {
        return false // do nothing if it's empty
      }

      // Try parsing them!  This will work for
      // DMS format or decimal.
      try {
        parsedDms = parseDMS(this.latlngInput)
      } catch (e) {
        this.fieldMessage = "I can't figure out how to make that a point."
        return false // invalid
      }

      if (parsedDms && parsedDms.lat && parsedDms.lon) {
        let latLng = turf.point([parsedDms.lon, parsedDms.lat])
        let iemPoly = turf.multiPolygon(
          iemJson.features[0].geometry.coordinates
        )

        // Maybe valid, test for inclusion in polygon.
        if (turf.booleanPointInPolygon(latLng, iemPoly)) {
          latLng = {
            lat: parsedDms.lat.toFixed(2),
            lng: parsedDms.lon.toFixed(2),
          }
          return latLng
        } else {
          this.fieldMessage =
            'That point is outside of the domain of these datasets.'
          return false
        }
      }
    },
  },
}
</script>
