<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Mean annual ground temperature at 1 meter depth,
      <span v-html="place"></span>, 2021&ndash;2100
    </h5>
    <div class="is-size-6 mb-4">
      <b-field label="Model">
        <b-radio
          v-model="magt_model_selection"
          name="magt_model_selection"
          native-value="1"
          >GFDL-CM3</b-radio
        >
        <b-radio
          v-model="magt_model_selection"
          name="magt_model_selection"
          native-value="2"
          >NCAR-CCSM4</b-radio
        >
      </b-field>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap
          scenario="0"
          :model="magt_model_selection"
          daterange="2021-2039"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap
          scenario="0"
          :model="magt_model_selection"
          daterange="2040-2069"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap
          scenario="0"
          :model="magt_model_selection"
          daterange="2070-2099"
        />
      </div>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap
          scenario="1"
          :model="magt_model_selection"
          daterange="2021-2039"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap
          scenario="1"
          :model="magt_model_selection"
          daterange="2040-2069"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap
          scenario="1"
          :model="magt_model_selection"
          daterange="2070-2099"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ReportMagtMap from './ReportMagtMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportMagtMaps',
  components: {
    ReportMagtMap,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
    }),
  },
  data() {
    return {
      magt_model_selection: 1,
    }
  },
}
</script>
