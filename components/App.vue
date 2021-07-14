<template>
  <div>
    <client-only>
      <div v-show="!this.reportIsVisible" class="place-selector">
        <Map></Map>
      </div>
      <div v-show="this.reportIsVisible" class="report-wrapper">
        <Report></Report>
      </div>
    </client-only>
  </div>
</template>
<style></style>
<script>
import Map from '~/components/Map'
import Report from '~/components/Report'
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Map,
    Report,
  },
  created() {
    // Rehydrate place if present in URL.
    if (this.$route.query.lat && this.$route.query.lng) {
      this.setLatLng({
        lat: this.$route.query.lat,
        lng: this.$route.query.lng,
      })
    }
  },
  methods: {
    ...mapMutations(['setLatLng']),
  },
  computed: {
    ...mapState(['latlng']),
    ...mapGetters(['reportIsVisible']),
  },
}
</script>
