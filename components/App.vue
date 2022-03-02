<template>
  <div>
    <client-only>
      <div v-show="!this.reportIsVisible" class="place-selector">
        <div class="container">
          <section class="section">
            <div class="columns" id="controls">
              <!-- ID above (#controls) is used as anchor target, don't remove -->
              <div class="column is-one-half">
                <PlaceSelector></PlaceSelector>
              </div>
              <div class="column is-one-half">
                <LatLngSelector></LatLngSelector>
              </div>
            </div>
          </section>
        </div>
        <!-- Map can't be wrapped in container/section, if we want it full-screen. -->
        <MapWrapper />
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

    // Populate the store with places.
    this.$fetch()
  },
  async fetch() {
    await this.$store.dispatch('place/fetchPlaces')
  },
}
</script>
