<template>
  <div class="place-selector--wrapper">
    <div class="content">
      <h4 class="title is-5">Find a place by name</h4>
      <p>
        Search below by <strong>community name</strong>,
        <strong>watershed</strong> (hydrological unit name or HUC8 code) or
        <strong>protected area</strong> (National Park, National Forest, etc).
        <nuxt-link :to="{ name: 'data', hash: '#places' }"
          >Read about all places included in this tool.</nuxt-link
        >
      </p>
      <p>
        <b-field>
          <b-autocomplete
            rounded
            v-model="selectedPlace"
            :data="filteredDataObj"
            keep-first
            field="name"
            placeholder="e.g. Fairbanks"
            icon="magnify"
            clearable
            clear-on-select
            @select="option => (selected = option)"
          >
            <template #empty>No results found</template>
            <template slot-scope="props">
              <div class="search-item">
                {{ props.option.name }}
                <span class="watershed" v-if="props.option.type == 'huc'"
                  >Watershed, HUC ID {{ props.option.id }}</span
                >
                <span class="alt-name" v-if="props.option.alt_name"
                  >({{ props.option.alt_name }})</span
                >
                <span
                  class="protected-area"
                  v-if="props.option.type == 'protected_area'"
                >
                  {{ props.option.area_type }}
                </span>
              </div>
            </template>
          </b-autocomplete>
        </b-field>
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.place-selector--wrapper * {
  z-index: 10000;
}

.search-item {
  font-weight: 600;
  white-space: normal;
  .watershed,
  .protected-area {
    text-transform: uppercase;
    display: inline-block;
    padding-left: 1ex;
    color: #888;
  }
}
</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'PlaceSelector',
  data() {
    return {
      selected: undefined, // the actual selected place
      selectedPlace: '', // the temporary search fragment
    }
  },
  computed: {
    filteredDataObj() {
      // Guard in case the async loading of places isn't done yet.
      if (this.places) {
        return this.places.filter(option => {
          return (
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.selectedPlace.toLowerCase()) >= 0 ||
            (option.alt_name &&
              option.alt_name
                .toString()
                .toLowerCase()
                .indexOf(this.selectedPlace.toLowerCase()) >= 0) ||
            (option.area_type &&
              option.area_type
                .toString()
                .toLowerCase()
                .indexOf(this.selectedPlace.toLowerCase()) >= 0) ||
            // HUCID, check only if it's 4 digits or more
            (this.selectedPlace.length > 3 &&
              (option.id.toString().indexOf(this.selectedPlace) >= 0 ||
                option.id.toString().indexOf('huc ' + this.selectedPlace) >=
                  0 ||
                option.id.toString().indexOf('HUC ' + this.selectedPlace) >=
                  0 ||
                option.id.toString().indexOf('huc-' + this.selectedPlace) >=
                  0 ||
                option.id.toString().indexOf('HUC-' + this.selectedPlace) >= 0))
          )
        })
      }
    },
    ...mapGetters({
      places: 'place/places',
    }),
  },
  watch: {
    selected: function (selected) {
      if (selected && selected.type) {
        let path
        switch (selected.type) {
          case 'huc':
            path = '/report/huc/' + selected.id
            break
          case 'protected_area':
            path = '/report/protected_area/' + selected.id
            break
          case 'community':
            path = '/report/community/' + selected.id
        }
        // Triggers the navigation to the route path,
        // which loads the report + queries API, etc.
        this.$router.push({
          path: path,
          hash: '#results',
        })
      }
    },
  },
}
</script>
