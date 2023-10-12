<template>
  <div class="map-wrapper--outer is-hidden-touch">
    <div class="container mb-3">
      <div class="content fullbleed">
        <h4>Find a place by clicking on the map</h4>
        <p>
          <strong>Click the map</strong> to pick a location. Nearby communities,
          protected areas and watersheds will be shown.
        </p>
      </div>
    </div>
    <div id="map-search">
      <div class="is-flex is-flex-direction-row">
        <div
          id="map--wrapper"
          v-bind:class="{ minimized: mapSearchIsVisible }"
          v-bind:style="mapStyleObject"
        >
          <Map />
        </div>
        <div
          id="map--sidebar"
          v-bind:class="{ minimized: !mapSearchIsVisible }"
          class="content fullbleed pb-5"
        >
          <div v-if="$fetchState.pending" class="pending">
            <!-- Drama dots -->
            <h4 class="title is-5">Loading search results&hellip;</h4>
            <b-progress type="is-info"></b-progress>
          </div>
          <div v-else-if="$fetchState.error" class="error">
            <p class="is-size-5">Oh no! {{ $fetchState.error.message }}</p>
            <b-button
              class="is-warning"
              tag="nuxt-link"
              to="/#map"
              icon-left="emoticon-sad-outline"
            >
              <strong>We&rsquo;re sorry</strong>, please try again</b-button
            >
          </div>
          <div v-else>
            <SearchResults />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pending {
  width: 80%;
}

#map--wrapper {
  min-height: 100vh;
  width: 100vw;
  &.minimized {
    width: 50vw;
    height: 50vw; // square
    margin-right: 1.5rem;
  }

  transition: width 0.3s ease-in-out;
}

#map--sidebar {
  display: block;
  width: 50vw;
  min-height: 100vh;

  &.minimized {
    display: none;
  }
}
</style>
<script>
import Map from './Map'
import SearchResults from './SearchResults'
import { mapGetters } from 'vuex'

export default {
  name: 'MapWrapper',
  components: { Map, SearchResults },
  computed: {
    mapStyleObject() {
      if (this.mapSearchIsVisible) {
        return {
          position: 'sticky',
          top: 0,
        }
      }
      return {}
    },
    ...mapGetters({
      searchResults: 'place/searchResults',
      mapSearchIsVisible: 'mapSearchIsVisible',
    }),
  },
  async fetch() {
    if (this.mapSearchIsVisible) {
      await this.$store
        .dispatch('place/search')
        .then(res => {
          // Some work remains TBD here.
        })
        .catch(e => {
          if (e.statusCode == 500) {
            throw 'The server had a problem trying to execute this request.'
          } else if (e.statusCode == 404) {
            throw 'No results were found for this place.'
          } else {
            console.error(e) // at least get the error in the console.
            throw 'Something unexpected went wrong.'
          }
        })
    }
  },
}
</script>
