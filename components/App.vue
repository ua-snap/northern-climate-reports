<template>
  <div>
    <client-only>
      <div v-show="!this.reportIsVisible" class="place-selector">
        <div class="container">
          <section class="section">
            <b-message
              title="This is a public beta test of this tool"
              type="is-warning"
              aria-close-label="Close message"
            >
              Thanks for checking out this tool! Right now, this is a public
              beta, which means that we&rsquo;re still gathering feedback,
              testing the data outputs and fixing bugs. We&rsquo;d love to hear
              your feedback. Email us at
              <a mailto="uaf-snap-data-tools@alaska.edu"
                >uaf-snap-data-tools@alaska.edu</a
              >
              with your thoughts, or
              <a
                href="https://uaf.us10.list-manage.com/subscribe?u=e42f589030a3adcaddd9b3304&id=d349c58c8f"
                >sign up for our occasional newsletter</a
              >
              to be notified when this tool is launched.
            </b-message>
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

    // Since this component is invoked whenever the `/` route fires,
    // we need to clear the stores.
    this.$store.commit('place/clear')
    this.$store.commit('climate/clear')
    this.$store.commit('elevation/clear')
    this.$store.commit('permafrost/clear')
    this.$store.commit('wildfire/clear')

    // Populate the store with places.
    this.$fetch()
  },
  async fetch() {
    await this.$store.dispatch('place/fetchPlaces')
  },
}
</script>
