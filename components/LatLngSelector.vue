<template>
	<div class="latlon-picker--wrapper">
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

export default {
	name: 'LatLngSelector',
	data() {
		return {
			latlngInput: '',
		}
	},
	computed: {
		// Returns the valid lat/lng, as an object,
		// { lat: lat, lng: lng }.  If not valid, returns False.
		latLng() {
			let parsedDms = undefined
			let latLng = false

			if (!this.latlngInput) {
				return false
			}

			// Try parsing them!  This will work for
			// DMS format or decimal.
			try {
				parsedDms = parseDMS(this.latlngInput)
			} catch (e) {
				return false // invalid
			}

			if (parsedDms && parsedDms.lat && parsedDms.lon) {
				// Maybe valid, test bbox.
				if (
					51.229 <= parsedDms.lat &&
					parsedDms.lat <= 71.3526 &&
					-179.1506 <= parsedDms.lon &&
					parsedDms.lon <= -129.9795
				) {
					latLng = { lat: parsedDms.lat.toFixed(2), lng: parsedDms.lon.toFixed(2) }
					return latLng
				}
			}
			return false
		},
		isValid() {
			return this.latLng // true/false
		},

		// These validations aren't great, but they're a start.
		// Don't bug the user until at least 8 chars are in, roughly
		// the minimum for a valid combo.
		getFieldStatus() {
			if (this.latlngInput.length < 8 || this.isValid) {
				return ''
			} else {
				return 'is-danger'
			}
		},
		getFieldMessage() {
			if (this.latlngInput.length < 8 || this.isValid) {
				return ''
			} else {
				return 'Invalid format, or, the point is outside the data range.'
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
	},
}
</script>
