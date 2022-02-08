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
        <Map></Map>
      </div>
      <div v-if="this.reportIsVisible" class="report-wrapper">
        <Report></Report>
      </div>
    </client-only>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import Map from '~/components/Map'
import Report from '~/components/Report'
import PlaceSelector from '~/components/PlaceSelector'
import LatLngSelector from '~/components/LatLngSelector'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Map,
    Report,
    LatLngSelector,
    PlaceSelector,
  },
  computed: {
    ...mapGetters(['reportIsVisible']),
  },
}
</script>
