<template>
  <div class="place-selector--wrapper">
    <div class="content">
      <h4 class="title is-5">Find a place by name</h4>
      <div>
        <b-field>
          <b-autocomplete
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
                <span
                  class="area-additional-info"
                  v-if="props.option.type == 'huc'"
                  >Watershed, HUC ID {{ props.option.id }}</span
                >
                <span class="alt-name" v-if="props.option.alt_name"
                  >({{ props.option.alt_name }})</span
                >
                <span
                  class="area-additional-info"
                  v-if="props.option.type == 'protected_area'"
                >
                  {{ props.option.area_type }}
                </span>
                <span
                  class="area-additional-info"
                  v-if="props.option.type == 'corporation'"
                >
                  Native Corporation
                </span>
                <span
                  class="area-additional-info"
                  v-if="props.option.type == 'climate_division'"
                >
                  Climate Division
                </span>
                <span
                  class="area-additional-info"
                  v-if="props.option.type == 'ethnolinguistic_region'"
                >
                  Ethnolinguistic Region
                </span>
                <span
                  class="area-additional-info"
                  v-if="props.option.type == 'fire_zone'"
                >
                  Fire Management Unit
                </span>
                <span
                  class="area-additional-info"
                  v-if="props.option.type == 'first_nation'"
                >
                  First Nation Traditional Territory
                </span>
                <span
                  class="area-additional-info"
                  v-if="props.option.type == 'game_management_unit'"
                >
                  Game Management Unit
                </span>
                <span
                  class="area-additional-info"
                  v-if="props.option.type == 'borough'"
                >
                  Borough
                </span>
              </div>
            </template>
          </b-autocomplete>
        </b-field>
      </div>
      <div class="name-types mt-2">
        <h5 class="is-title is-5">
          Search these names
          <span
            ><nuxt-link :to="{ name: 'places' }"
              >Learn more about these areas</nuxt-link
            ></span
          >
        </h5>
        <div class="name-types-list columns">
          <div class="column">
            <ul>
              <li>Alaska Climate Divisions</li>
              <li>Alaska Fire Management Units</li>
              <li>Alaska Game Management Units (GMUs)</li>
              <li>Alaska Native Corporations</li>
              <li>Boroughs and Census Areas</li>
              <li>Communities in Alaska and Canada</li>          
            </ul>
          </div>
          <div class="column">
            <ul>
              <li>Ethnolinguistic Divisions</li>
              <li>
                <strong>Hydrological units (HUs)</strong> searchable by HU Code
                (HUC8, HUC10) and name
              </li>
              <li>
                <strong>Protected areas</strong>&nbsp;&nbsp;National Parks and
                more, searchable by name and agency
              </li>
              <li>Yukon First Nation Traditional Territories</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.name-types {
  h5 span {
    display: inline-block;
    padding-left: 2rem;
    font-size: 85%;
  }
  .name-types-list.columns {
    .column {
      padding-top: 0;
      margin-top: -0.5rem;
      ul {
        list-style-type: none;
        padding-left: 0;
        margin-left: 0;
        li {
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}

.place-selector--wrapper * {
  z-index: 10000;
}

.search-item {
  font-weight: 600;
  white-space: normal;
  .area-additional-info {
    text-transform: uppercase;
    display: inline-block;
    padding-left: 1ex;
    color: #888;
    font-size: 90%;
  }
}
</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getAppPathFragment } from '~/utils/path.js'

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
        // Strip non-digit characters at the start to allow for
        // searching by "huc 1901..." etc -- the numeric HucID will
        // be searched.
        let strippedHucSearch = this.selectedPlace.replace(/^[\D]*/g, '')

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
                // Check for nonzero length of strippedHucSearch!
                (strippedHucSearch &&
                  option.id.toString().indexOf(strippedHucSearch) >= 0)))
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
        // Triggers the navigation to the route path,
        // which loads the report + queries API, etc.
        this.$router.push({
          path: getAppPathFragment(selected.type, selected.id),
          hash: '#results',
        })
      }
    },
  },
}
</script>
