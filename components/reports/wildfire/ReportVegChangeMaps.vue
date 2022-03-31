<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Vegetation change,
      <span v-html="place"></span>
    </h5>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="0" scenario="0" era="0" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="1" scenario="1" era="1" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="1" scenario="1" era="2" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="1" scenario="1" era="3" />
      </div>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="1" scenario="3" era="1" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="1" scenario="3" era="2" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="1" scenario="3" era="3" />
      </div>
    </div>
  </section>
</template>

<script>
import ReportVegChangeMap from './ReportVegChangeMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportVegChangeMaps',
  components: {
    ReportVegChangeMap,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
    }),
  },
}
</script>
