<template>
  <div class="px-5-touch">
    <client-only>
      <div v-show="!this.reportIsVisible">
        <div class="container mt-5">
          <div class="columns" id="controls">
            <!-- ID above (#controls) is used as anchor target, don't remove -->
            <div class="column is-half-desktop is-full-mobile is-full-tablet">
              <PlaceSelector></PlaceSelector>
            </div>
            <div class="column is-half-desktop is-hidden-mobile">
              <LatLngSelector></LatLngSelector>
            </div>
          </div>
        </div>

        <!-- Map can't be wrapped in container/section, if we want it full-screen. -->
        <div class="mt-5">
          <MapWrapper />
        </div>
      </div>
      <div v-if="this.reportIsVisible" class="report-wrapper">
        <Report></Report>
      </div>
    </client-only>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import MapWrapper from '~/components/MapWrapper'
import Report from '~/components/Report'
import PlaceSelector from '~/components/PlaceSelector'
import LatLngSelector from '~/components/LatLngSelector'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    MapWrapper,
    Report,
    LatLngSelector,
    PlaceSelector,
  },
  computed: {
    ...mapGetters(['reportIsVisible']),
  },
  created() {
    // Switch back to clean URL after S3 redirect. Adapted from here:
    // https://via.studio/journal/hosting-a-reactjs-app-with-routing-on-aws-s3
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1]
    if (path) {
      this.$router.push({ path: path })
    }

    // Since this component is invoked whenever the `/` route fires,
    // we need to clear the stores.
    this.$store.commit('beetle/clear')
    this.$store.commit('climate/clear')
    this.$store.commit('elevation/clear')
    this.$store.commit('hydrology/clear')
    this.$store.commit('indicators/clear')
    this.$store.commit('permafrost/clear')
    this.$store.commit('place/clear')
    this.$store.commit('wildfire/clear')

    // Populate the store with places.
    this.$fetch()
  },
  async fetch() {
    await this.$store.dispatch('place/fetchPlaces')
  },
}
</script>
