<template>
  <div>
    <h3 class="title is-4">
      Locations matching {{ lat }}&deg;N, {{ lng }}&deg;E
    </h3>
    <p>These areas of interest are at, or near, this point:</p>
    <ul>
      <li
        v-for="place in searchResults.protected_areas"
        :key="place.id"
        class="protected-area"
      >
        <a>{{ place.name }}</a> <span>{{ place.area_type }}</span>
      </li>
      <li v-for="huc in searchResults.hucs" :key="huc.id" class="huc">
        <a>{{ huc.name }}</a> <span>HUC ID {{ huc.id }}</span>
      </li>
    </ul>
    <p>Nearby communities listed in this tool:</p>
    <ul>
      <li
        v-for="community in searchResults.communities"
        :key="community.id"
        class="community"
      >
        <a
          >{{ community.name }}
          <span v-if="community.alt_name">({{ community.alt_name }})</span></a
        >
      </li>
    </ul>
    <p>
      Or
      <a href=""
        >show data extracted for the point at {{ lat }}&deg;N,
        {{ lng }}&deg;W</a
      >.
    </p>
    <b-button
      class="default"
      tag="nuxt-link"
      to="/"
      type="is-info"
      icon-left="arrow-left-circle"
    >
      <strong>Go back</strong>, pick another place</b-button
    >
  </div>
</template>
<style lang="scss" scoped>
li.protected-area span,
li.huc span {
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
}
</style>
<script>
import { mapGetters } from 'vuex'
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
}
</script>
