<template>
  <div>
    <div>
      <h3 class="title is-3">Hydrology</h3>
      <div class="block content is-size-5">
        <p>
          This section provides access to historical and projected modeled
          decadal summaries of hydrologic data for Alaska at a resolution of
          12km. These data were derived by applying the Variable Infiltration
          Capacity (VIC) model to downscaled CMIP5 historical and projected
          climate data, using RCP 4.5 and RCP 8.5 emissions scenarios.
        </p>

        <p>
          The tables below show the minimum, mean and maximum values for the
          annual means across 3 models: CanESM2, GFDL ESM2M, and NCAR CCSM4 and
          2 scenarios: RCP 4.5 and RCP 8.5 for each of the given eras.
        </p>
      </div>

      <ReportHydrologyTables />
      <ReportHydrologyMaps />

      <DownloadCsvButton
        text="Download hydrology data as CSV"
        endpoint="hydrology"
        class="mt-3 mb-5"
      />
      <BackToTopButton />
    </div>
  </div>
</template>
<style></style>
<script>
import BackToTopButton from '~/components/reports/BackToTopButton'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'
import ReportHydrologyMaps from '~/components/reports/hydrology/ReportHydrologyMaps'
import ReportHydrologyTables from '~/components/reports/hydrology/ReportHydrologyTables'

export default {
  name: 'HydrologyReport',
  components: {
    BackToTopButton,
    DownloadCsvButton,
    ReportHydrologyMaps,
    ReportHydrologyTables,
  },
  data() {
    return {
      radioHydroModel: 'CanESM2',
      radioHydroScenario: 'rcp45',
    }
  },
}
</script>
