<template>
  <div v-if="searchResults">
    <h3 class="title is-4">
      Locations matching {{ lat }}&deg;N, {{ lng }}&deg;E
    </h3>
    <p>These areas of interest are at, or near, this point:</p>
    <ul v-if="searchResults.protected_areas_near || searchResults.hucs_near || searchResults.corporations_near || searchResults.climate_divisions_near || searchResults.ethnolinguistic_regions_near">
      <li
        v-for="place in searchResults.climate_divisions_near"
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
        <span>Climate Division</span>
      </li>
      <li
        v-for="place in searchResults.ethnolinguistic_region"
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
        <span>Ethnolinguistic Region</span>
      </li>
      <li
        v-for="place in searchResults.protected_areas_near"
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
        <span>{{ place.area_type }}</span>
      </li>
      <li v-for="huc in searchResults.hucs_near" :key="huc.id" class="additional-info">
        <nuxt-link
          :to="{
            path: formUrl(huc),
            hash: '#results',
          }"
          >{{ huc.name }}</nuxt-link
        >
        <span>HUC ID {{ huc.id }}</span>
      </li>
      <li
        v-for="place in searchResults.corporations_near"
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
        <span>Native Corporation</span>
      </li>
      <li
        v-for="place in searchResults.fire_management_units_near"
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
        <span>Fire Management Unit</span>
      </li>
    </ul>
    <div v-if="searchResults.communities" class="mb-4">
      <p>Nearby places and communities listed in this tool:</p>
      <ul>
        <li
          v-for="community in searchResults.communities"
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
    <p>
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
    <b-button
      class="default"
      tag="nuxt-link"
      to="/#map"
      type="is-info"
      icon-left="arrow-left-circle"
    >
      <strong>Go back</strong>, pick another place</b-button
    >
  </div>
</template>
<style lang="scss" scoped>
li.additional-info span {
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
}
</style>
<script>
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
    ...mapGetters({
      searchResults: 'place/searchResults',
      latLng: 'place/latLng',
    }),
  },
  methods: {
    formUrl(place) {
      return getAppPathFragment(place.type, place.id)
    },
  },
}
</script>
