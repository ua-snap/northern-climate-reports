<template>
  <div>
    <div class="content">
      <h3 class="title is-3">Hydrology</h3>
      <div class="block content is-size-5">
        <p>
          This section provides access to historical and projected modeled
          decadal summaries of hydrologic data for Alaska at a resolution of
          12km. These data were derived by applying the Variable Infiltration
          Capacity (VIC) model to downscaled CMIP5 historical and projected
          climate data, using RCP 4.5 and RCP 8.5 emissions scenarios.
        </p>
      </div>

      <div class="block">
        <h4 class="title is-5 mb-1">Data Summary</h4>
        <div class="content is-size-5">
          The blocks below show the minimum, mean and maximum values for the
          annual means across 3 models: CanESM2, GFDL-ESM2M, and NCAR-CCSM4 and
          2 scenarios: RCP 4.5 and RCP 8.5 for each of the given eras.
        </div>
      </div>

      <!-- <div class="radio-units no-print">
        <div>
          <b-field label="Model">
            <b-radio
              v-model="radioHydroModel"
              name="radioHydroModel"
              native-value="CanESM2"
            >
              CanESM2
            </b-radio>
            <b-radio
              v-model="radioHydroModel"
              name="radioHydroModel"
              native-value="GFDL-ESM2M"
            >
              GFDL-ESM2M
            </b-radio>
            <b-radio
              v-model="radioHydroModel"
              name="radioHydroModel"
              native-value="CCSM4"
            >
              NCAR-CCSM4
            </b-radio>
          </b-field>
        </div>
      </div>
      <div class="radio-units no-print">
        <div>
          <b-field label="Scenario">
            <b-radio
              v-model="radioHydroScenario"
              name="radioHydroScenario"
              native-value="rcp45"
            >
              RCP 4.5
            </b-radio>
            <b-radio
              v-model="radioHydroScenario"
              name="radioHydroScenario"
              native-value="rcp85"
            >
              RCP 8.5
            </b-radio>
          </b-field>
        </div>
      </div>

      <h4 class="title is-4 mt-6">Runoff</h4>
      <div class="block">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Min</th>
              <th scope="col">Mean</th>
              <th scope="col">Max</th>
            </tr>
          </thead>
          <tbody>
            <tr class="historical">
              <th scope="row">Historical (1950&ndash;2009)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.historical.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.historical.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.historical.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
            <tr>
              <th scope="row">Early Century (2010&ndash;2039)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.early_century.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.early_century.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.early_century.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
            <tr>
              <th scope="row">Mid Century (2040&ndash;2069)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.mid_century.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.mid_century.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.mid_century.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
            <tr>
              <th scope="row">Late Century (2070&ndash;2099)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.late_century.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.late_century.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.runoff.late_century.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="title is-4 mt-6">Evapotranspiration</h4>
      <div class="block">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Min</th>
              <th scope="col">Mean</th>
              <th scope="col">Max</th>
            </tr>
          </thead>
          <tbody>
            <tr class="historical">
              <th scope="row">Historical (1950&ndash;2009)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.historical.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.historical.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.historical.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
            <tr>
              <th scope="row">Early Century (2010&ndash;2039)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.early_century.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.early_century.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.early_century.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
            <tr>
              <th scope="row">Mid Century (2040&ndash;2069)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.mid_century.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.mid_century.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.mid_century.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
            <tr>
              <th scope="row">Late Century (2070&ndash;2099)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.late_century.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.late_century.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.evap.late_century.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="title is-4 mt-6">Soil Moisture</h4>
      <div class="block">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Min</th>
              <th scope="col">Mean</th>
              <th scope="col">Max</th>
            </tr>
          </thead>
          <tbody>
            <tr class="historical">
              <th scope="row">Historical (1950&ndash;2009)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.historical.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.historical.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.historical.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
            <tr>
              <th scope="row">Early Century (2010&ndash;2039)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.early_century.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.early_century.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.early_century.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
            <tr>
              <th scope="row">Mid Century (2040&ndash;2069)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.mid_century.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.mid_century.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.mid_century.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
            <tr>
              <th scope="row">Late Century (2070&ndash;2099)</th>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.late_century.min
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.late_century.mean
                }}<UnitWidget unitType="mm_in" />
              </td>
              <td>
                {{
                  results.hydrology.summary[`${radioHydroModel}`][
                    `${radioHydroScenario}`
                  ].Annual.sm1.late_century.max
                }}<UnitWidget unitType="mm_in" />
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->

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

export default {
  name: 'HydrologyReport',
  components: {
    BackToTopButton,
    DownloadCsvButton,
    ReportHydrologyMaps,
  },
  data() {
    return {
      radioHydroModel: 'CanESM2',
      radioHydroScenario: 'rcp45',
    }
  },
}
</script>
