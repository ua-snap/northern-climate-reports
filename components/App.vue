<template>
  <div>
    <client-only>
      <div v-show="!this.reportIsVisible" class="place-selector">
        <div class="container">
          <section class="section">
            <PlaceSelector></PlaceSelector>
          </section>
        </div>
        <!-- Map can't be wrapped in container/section, if we want it full-screen. -->
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
import PlaceSelector from '~/components/PlaceSelector'

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
    } else if (this.$route.query.placeId) {
      this.setPlaceId(this.$route.query.placeId)
    }

  },
  methods: {
    ...mapMutations(['setLatLng', 'setPlaceId']),
  },
  computed: {
    ...mapState(['latlng']),
    ...mapGetters(['reportIsVisible']),
  },
}
</script>
