<template>
  <div>
    <div class="content">
      <h3 class="title is-3">Hydrology</h3>
      <div class="is-size-5">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor
          at risus viverra adipiscing at in tellus integer. Et malesuada fames
          ac turpis egestas maecenas pharetra. Facilisis volutpat est velit
          egestas dui. Velit aliquet sagittis id consectetur. Egestas tellus
          rutrum tellus pellentesque eu tincidunt tortor. Molestie nunc non
          blandit massa enim nec dui.
        </p>
      </div>
    </div>
    <div class="is-size-6 mt-4">
      <b-field label="Variable">
        <b-radio v-model="variable" name="variable" native-value="evap"
          >Evapotranspiration</b-radio
        >
        <b-radio v-model="variable" name="variable" native-value="runoff"
          >Surface Runoff</b-radio
        >
        <b-radio v-model="variable" name="variable" native-value="snow_melt"
          >Snow Melt</b-radio
        >
        <b-radio v-model="variable" name="variable" native-value="sm1"
          >Soil Moisture</b-radio
        >
      </b-field>
    </div>
    <div class="is-size-6 mt-4">
      <b-field label="Model">
        <b-radio v-model="model" name="model" native-value="CanESM2"
          >CanESM2</b-radio
        >
        <b-radio v-model="model" name="model" native-value="GFDL-ESM2M"
          >GFDL-ESM2M</b-radio
        >
        <b-radio v-model="model" name="model" native-value="CCSM4"
          >NCAR-CCSM4</b-radio
        >
      </b-field>
    </div>
    <div class="is-size-6 mt-4">
      <b-field label="Scenario">
        <b-radio v-model="scenario" name="scenario" native-value="rcp45"
          >RCP 4.5</b-radio
        >
        <b-radio v-model="scenario" name="scenario" native-value="rcp85"
          >RCP 8.5</b-radio
        >
      </b-field>
    </div>
    <ReportHydrologyChart
      :variable="variable"
      :model="model"
      :scenario="scenario"
    />
    <DownloadCsvButton
      text="Download hydrology data as CSV"
      endpoint="hydrology"
      class="mt-3 mb-5"
    />
    <BackToTopButton />
  </div>
</template>
<style></style>
<script>
import BackToTopButton from '~/components/reports/BackToTopButton'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'
import ReportHydrologyChart from './ReportHydrologyChart'

export default {
  name: 'HydrologyReport',
  components: {
    BackToTopButton,
    DownloadCsvButton,
    ReportHydrologyChart,
  },
  data() {
    return {
      variable: 'evap',
      model: 'CanESM2',
      scenario: 'rcp45',
    }
  },
}
</script>
