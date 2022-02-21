<template>
  <section class="section">
    <div class="is-size-6 mb-4">
      <b-field label="Model">
        <b-radio
          v-model="model_selection"
          name="model_selection"
          native-value="3"
          >NCAR CCSM4</b-radio
        >
        <b-radio
          v-model="model_selection"
          name="model_selection"
          native-value="4"
          >MRI CGCM3</b-radio
        >
      </b-field>
    </div>
    <div class="columns">
      <div class="column is-flex">
        <ReportMagtMap
          scenario="0"
          model="0"
          era="0"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="1"
          :model="model_selection"
          :key="model_selection + '-rcp45-2025'"
          era="1"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="1"
          :model="model_selection"
          :key="model_selection + '-rcp45-2050'"
          era="2"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="1"
          :model="model_selection"
          :key="model_selection + '-rcp45-2075'"
          era="3"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="1"
          :model="model_selection"
          :key="model_selection + '-rcp45-2095'"
          era="4"
          class="report--deltamap--map"
        />
      </div>
    </div>
    <div class="columns">
      <div class="column is-flex">
        <div class="report--deltamap--map" />
        <ReportMagtMap
          scenario="2"
          :model="model_selection"
          :key="model_selection + '-rcp85-2025'"
          era="1"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="2"
          :model="model_selection"
          :key="model_selection + '-rcp85-2050'"
          era="2"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="2"
          :model="model_selection"
          :key="model_selection + '-rcp85-2075'"
          era="3"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="2"
          :model="model_selection"
          :key="model_selection + '-rcp85-2095'"
          era="4"
          class="report--deltamap--map"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 3rem;
}
.report--deltamap--map {
  height: 17vw;
  min-width: 10vw;
  width: 20%;
  margin: 5px;
}
</style>

<script>
import ReportMagtMap from './ReportMagtMap'
export default {
  name: 'ReportMagtMaps',
  components: {
    ReportMagtMap,
  },
  data() {
    return {
      model_selection: 3,
    }
  },
}
</script>
