<template>
  <a :href="downloadTarget" class="button">Download data as CSV</a>
</template>
<style lang="scss" scoped></style>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DownloadCsvButton',
  computed: {
    downloadTarget() {
      let urlFragment
      let latLng = this.$store.getters.getLatLng

      if (this.latLng) {
        // Community or direct lat/lng
        urlFragment = 'point/' + this.latLng[0] + '/' + this.latLng[1]
      } else if (this.hucId) {
        // HUC.
        urlFragment = 'huc/' + this.hucId
      } else if (this.protectedAreaId) {
        urlFragment = 'protectedarea/' + this.protectedAreaId
      }
      return process.env.apiUrl + '/taspr/' + urlFragment + '?format=csv'
    },
    ...mapGetters({
      latLng: 'getLatLng',
      hucId: 'getHucId',
      protectedAreaId: 'getProtectedAreaId',
    }),
  },
}
</script>
