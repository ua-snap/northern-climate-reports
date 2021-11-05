<template>
	<a :href="downloadTarget" class="button">Download data as CSV</a>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
	name: 'DownloadCsvButton',
	computed: {
		downloadTarget() {
			let urlFragment
			let latLng = this.$store.getters.getLatLng

			if (latLng) {
				// Community or direct lat/lng
				urlFragment = 'point/' + latLng[0] + '/' + latLng[1]
			} else {
				// HUC.
				urlFragment = 'huc/' + this.$store.getters.getHucId
			}
			return process.env.apiUrl + '/iem/' + urlFragment + "?format=csv"
		},
	},
}
</script>
