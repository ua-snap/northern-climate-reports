<template>
  <div v-if="searchResults">
    <h3 class="title is-4">
      Locations matching {{ lat }}&deg;N, {{ lng }}&deg;E
    </h3>

    <div v-if="searchBlocks.areas.length">
      <p>
        The map on the left shows watersheds and protected areas near the point
        you selected. Additional areas of interest (ethnolinguistic regions,
        fire management units, climate divisions and Native corporations) are
        not shown on the map because they are large, but are included in the
        list of matching areas below.
      </p>

      <ul>
        <li
          v-for="place in searchBlocks.areas"
          :key="place.id"
          class="additional-info"
        >
          <nuxt-link
            :to="{
              path: formUrl(place),
              hash: '#results',
            }"
            >{{ place.name }}</nuxt-link
          >
          <span
            v-if="formPlaceTypeFragment(place)"
            v-html="formPlaceTypeFragment(place)"
          ></span>
        </li>
      </ul>
    </div>

    <div v-if="searchBlocks.hucs.length">
      <h4 class="subtitle is-6 mt-5 mb-1">Hydrological units (HUCs)</h4>
      <ul>
        <li
          v-for="place in searchBlocks.hucs"
          :key="place.id"
          class="additional-info"
        >
          <nuxt-link
            :to="{
              path: formUrl(place),
              hash: '#results',
            }"
            >{{ place.name }}</nuxt-link
          >
          <span
            v-if="formPlaceTypeFragment(place)"
            v-html="formPlaceTypeFragment(place)"
          ></span>
        </li>
      </ul>
    </div>

    <div v-if="searchBlocks.communities" class="mt-4 mb-4">
      <p>Nearby places and communities included in this tool:</p>
      <ul>
        <li
          v-for="community in searchBlocks.communities"
          :key="community.id"
          class="community"
        >
          <nuxt-link
            :to="{
              path: formUrl(community),
              hash: '#results',
            }"
            >{{ community.name }}
            <span v-if="community.alt_name"
              >({{ community.alt_name }})</span
            ></nuxt-link
          >
        </li>
      </ul>
    </div>
    <p class="mt-4">
      Or
      <nuxt-link
        :to="{
          path: '/report/' + lat + '/' + lng,
          hash: '#results',
        }"
        >show data extracted for the point at {{ lat }}&deg;N,
        {{ lng }}&deg;E</nuxt-link
      >.
    </p>
  </div>
</template>
<style lang="scss" scoped>
li.additional-info span {
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 85%;
}
</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getAppPathFragment } from '~/utils/path.js'

export default {
  name: 'SearchResults',
  computed: {
    lat() {
      return this.latLng[0]
    },
    lng() {
      return this.latLng[1]
    },
    searchBlocks() {
      let blocks = {}
      blocks.communities = this.searchResults.communities
      blocks.hucs = _.filter(this.searchResults.areas, area => {
        return area.type == 'huc'
      })
      blocks.areas = _.filter(this.searchResults.areas, area => {
        return area.type != 'huc'
      })
      return blocks
    },
    ...mapGetters({
      searchResults: 'place/searchResults',
      latLng: 'place/latLng',
    }),
  },
  methods: {
    formUrl(place) {
      return getAppPathFragment(place.type, place.id)
    },
    formPlaceTypeFragment(place) {
      let placeType = false
      switch (place.type) {
        case 'corporation':
          placeType = 'Native Corporation Lands'
          break
        case 'huc':
          placeType =
            'HUC' + (place.id.length == 10 ? '10 ' : '8 ') + 'ID' + place.id
          break
        case 'yt_watershed':
          placeType = 'Yukon Watershed'
          break
        case 'climate_division':
          placeType = 'Climate Division'
          break
        case 'fire_zone':
          placeType = 'Fire Management Unit'
          break
        case 'yt_fire_district':
          placeType = 'Yukon Fire District'
          break
        case 'game_management_unit':
          placeType = 'Game Management Unit'
          break
        case 'yt_game_management_subzone':
          placeType = 'Yukon Game Management Subzone'
          break
        case 'first_nation':
          placeType = 'First Nation Traditional Territory'
          break
        case 'borough':
          placeType = 'Borough'
          break
        case 'ethnolinguistic_region':
          placeType = 'Ethnolinguistic Region'
          break
        default: // Do nothing, don't decorate protected areas
      }
      return placeType
    },
  },
}
</script>
