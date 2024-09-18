<template>
  <div>
    <h3 class="title is-3">Species of Greatest Conservation Need</h3>
    <div class="content is-size-5">
      <p>
        This dataset represents the results of a project that compiled available range information for three taxonomic groups representing 211 species (159 birds, 45 mammals, and 5 amphibians) identified as Species of Greatest Conservation Need by the <a href="https://www.adfg.alaska.gov/index.cfm?adfg=wildlifediversity.swap">2015 Alaska Wildlife Action Plan (SWAP) Appendix A</a> in addition to 2 amphibian species native to Alaska.
      </p>
      <h4 class="subtitle is-4">What is this list showing?</h4>
      <p>The Alaska Wildlife Action Plan identified species which...</p>
      
      <div class="block">
        <div class="tabs is-large">
          <ul>
            <li :class="{ 'is-active': activeTab === 'birds' }">
              <a @click="changeTab('birds')">Birds</a>
            </li>
            <li :class="{ 'is-active': activeTab === 'mammals' }">
              <a @click="changeTab('mammals')">Mammals</a>
            </li>
            <li :class="{ 'is-active': activeTab === 'amphibians' }">
              <a @click="changeTab('amphibians')">Amphibians</a>
            </li>
          </ul>
        </div>

        <div class="species" v-if="activeTab === 'birds'">
          <ul>
            <li v-for="animal in species['bird']">
              {{ animal['common_name'] }}&nbsp;<span
                >({{ animal['scientific_name'] }})</span
              >
            </li>
          </ul>
        </div>

        <div class="species" v-if="activeTab === 'mammals'">
          <ul>
            <li v-for="animal in species['mammal']">
              {{ animal['common_name'] }}&nbsp;<span
                >({{ animal['scientific_name'] }})</span
              >
            </li>
          </ul>
        </div>

        <div class="species" v-if="activeTab === 'amphibians'">
          <ul>
            <li v-for="animal in species['amphibian']">
              {{ animal['common_name'] }}&nbsp;<span
                >({{ animal['scientific_name'] }})</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <DownloadCsvButton
      text="Download species data as CSV"
      endpoint="species"
      class="mt-3 mb-5"
    />
  </div>
</template>
<style>
.species {
  span {
    font-style: italic;
    font-weight: 300;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import BackToTopButton from '~/components/reports/BackToTopButton'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'

export default {
  components: {
    BackToTopButton,
    DownloadCsvButton,
  },
  data() {
    return {
      activeTab: 'birds',
    }
  },
  computed: {
    ...mapGetters({
      species: 'species/speciesData',
      place: 'place/name',
    }),
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
    },
  },
}
</script>
