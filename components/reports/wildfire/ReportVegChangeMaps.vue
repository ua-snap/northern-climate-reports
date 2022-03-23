<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Relative vegetation change,
      <span v-html="place"></span>
    </h5>
    <div class="columns is-flex-direction-row">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap historical="true" era="1" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="0" scenario="0" era="4" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="0" scenario="0" era="8" />
      </div>
      <div class="minimap-container my-4 p-1"></div>
    </div>
    <div class="columns is-flex-direction-row">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap historical="false" scenario="2" model="0" era="4" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap historical="false" scenario="2" model="0" era="8" />
      </div>
      <div class="minimap-container my-4 p-1"></div>
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
