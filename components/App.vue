<template>
  <div v-if="offline">
    <div class="container content is-large">
      <div class="offline mx-6 my-6 px-6 py-6">
        <h3 class="title is-3">
          Northern Climate Reports offline for maintenance
        </h3>
        <div class="content is-size-4">
          <p>
            We&rsquo;re sorry! Northern Climate Reports is currently offline for
            system maintenance. We&rsquo;re working to complete this maintenance
            and have Northern Climate Reports back online as soon as possible,
            but we don&rsquo;t have an estimated time for completion. Please
            check back soon, or reach out to us at
            <a href="mailto:uaf-snap-data-tools@alaska.edu"
              >uaf-snap-data-tools@alaska.edu</a
            >
            with questions.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="px-5-touch">
    <client-only>
      <div v-if="slow">
        <div class="container mt-5">
          <b-message
            title="Northern Climate Reports is experiencing slow load times"
            type="is-warning"
            aria-close-label="Close message"
          >
            <p>
              We&rsquo;re sorry! Northern Climate Reports is experiencing slower
              load times than usual. We&rsquo;re working to improve performance
              as soon as possible, but we don&rsquo;t have an estimated time for
              completion. Please check back soon, or reach out to us at
              <a href="mailto:uaf-snap-data-tools@alaska.edu"
                >uaf-snap-data-tools@alaska.edu</a
              >
              with questions.
            </p>
          </b-message>
        </div>
      </div>
      <div v-show="!this.reportIsVisible">
        <div class="container mt-5">
          <div class="message is-info">
            <div class="message-body">
              <p>Read a
                <a
                  class="has-text-weight-semibold"
                  href="https://uaf-snap.org/wp-content/uploads/2025/10/ncr-user-guide-full.pdf"
                  >user guide about this tool</a
                >
                to learn how to access community-level information to better
                understand and reduce climate-related risks, plan
                infrastructure, manage natural resources, and communicate about
                changes happening in your community.
              </p>
            </div>
          </div>
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
<style lang="scss" scoped>
.message .message-body {
  color: #000;
}
.offline {
  border: 0.1px solid #888;
  min-height: 1030px;
  background-color: #e7b69a;
  background-image: url('~/assets/images/vacation.jpg');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
}
</style>
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
  data() {
    return {
      offline: process.env.offline,
      slow: process.env.slow,
    }
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
    this.$store.commit('demographics/clear')

    // Populate the store with places.
    this.$fetch()
  },
  async fetch() {
    await this.$store.dispatch('place/fetchPlaces')
  },
}
</script>
