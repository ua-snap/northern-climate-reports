<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Mean annual ground temperature,
      <span v-html="place"></span>, 1995&ndash;2100
    </h5>
    <div class="is-size-6 mb-4">
      <b-field label="Model">
        <b-radio
          v-model="magt_model_selection"
          name="magt_model_selection"
          native-value="3"
          >NCAR CCSM4</b-radio
        >
        <b-radio
          v-model="magt_model_selection"
          name="magt_model_selection"
          native-value="4"
          >MRI CGCM3</b-radio
        >
      </b-field>
    </div>
    <div class="columns is-flex-direction-row">
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="0" model="0" era="0" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="1" :model="magt_model_selection" era="1" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="1" :model="magt_model_selection" era="2" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="1" :model="magt_model_selection" era="3" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="1" :model="magt_model_selection" era="4" />
      </div>
    </div>
    <div class="columns is-flex-direction-row">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="2" :model="magt_model_selection" era="1" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="2" :model="magt_model_selection" era="2" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="2" :model="magt_model_selection" era="3" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="2" :model="magt_model_selection" era="4" />
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
      magt_model_selection: 3,
    }
  },
}
</script>
