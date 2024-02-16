<template>
  <div>
    <div class="radio-units no-print">
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
            GFDL ESM2M
          </b-radio>
          <b-radio
            v-model="radioHydroModel"
            name="radioHydroModel"
            native-value="CCSM4"
          >
            NCAR CCSM4
          </b-radio>
        </b-field>
      </div>
    </div>

    <div
      class="block"
      v-for="(variable, vindex) in ['evap', 'runoff']"
      :key="vindex"
    >
      <table class="table report-table">
        <caption>
          {{
            mapVariables(variable)
          }},

          <span v-html="place"></span>
          , 1950&ndash;2099,
          {{
            radioHydroModel
          }}
          model
        </caption>
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="left">Season</th>
            <th scope="col" rowspan="2" class="left">
              Historical (Modeled, 1950&ndash;2009)
            </th>
            <th scope="col" colspan="2" class="light-border">
              Early&ndash;Century (2010&ndash;2039)
            </th>
            <th scope="col" colspan="2" class="light-border">
              Mid&ndash;Century (2040&ndash;2069)
            </th>
            <th scope="col" colspan="2" class="light-border">
              Long&ndash;Term (2070&ndash;2099)
            </th>
          </tr>
          <tr>
            <th scope="col">Low Emissions (RCP 4.5)</th>
            <th scope="col">High Emissions (RCP 8.5)</th>
            <th scope="col">Low Emissions (RCP 4.5)</th>
            <th scope="col">High Emissions (RCP 8.5)</th>
            <th scope="col">Low Emissions (RCP 4.5)</th>
            <th scope="col">High Emissions (RCP 8.5)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(season, sindex) in ['Spring', 'Summer', 'Fall', 'Winter']"
            :key="sindex"
          >
            <th scope="row">{{ season }}</th>
            <td class="left">
              {{
                reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                  `${variable}`
                ].historical.total
              }}
              <UnitWidget variable="hydro" />
            </td>
            <td>
              {{
                reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                  `${variable}`
                ].early_century.total
              }}
              <UnitWidget variable="hydro" />
              <HydroDiffWidget
                :past="
                  reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                    `${variable}`
                  ].historical.total
                "
                :future="
                  reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                    `${variable}`
                  ].early_century.total
                "
              />
            </td>
            <td>
              {{
                reportData[`${radioHydroModel}`]['rcp85'][`${season}`][
                  `${variable}`
                ].early_century.total
              }}
              <UnitWidget variable="hydro" />
              <HydroDiffWidget
                :past="
                  reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                    `${variable}`
                  ].historical.total
                "
                :future="
                  reportData[`${radioHydroModel}`]['rcp85'][`${season}`][
                    `${variable}`
                  ].early_century.total
                "
              />
            </td>
            <td>
              {{
                reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                  `${variable}`
                ].mid_century.total
              }}
              <UnitWidget variable="hydro" />
              <HydroDiffWidget
                :past="
                  reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                    `${variable}`
                  ].historical.total
                "
                :future="
                  reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                    `${variable}`
                  ].mid_century.total
                "
              />
            </td>
            <td>
              {{
                reportData[`${radioHydroModel}`]['rcp85'][`${season}`][
                  `${variable}`
                ].mid_century.total
              }}
              <UnitWidget variable="hydro" />
              <HydroDiffWidget
                :past="
                  reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                    `${variable}`
                  ].historical.total
                "
                :future="
                  reportData[`${radioHydroModel}`]['rcp85'][`${season}`][
                    `${variable}`
                  ].mid_century.total
                "
              />
            </td>
            <td>
              {{
                reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                  `${variable}`
                ].late_century.total
              }}
              <UnitWidget variable="hydro" />
              <HydroDiffWidget
                :past="
                  reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                    `${variable}`
                  ].historical.total
                "
                :future="
                  reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                    `${variable}`
                  ].late_century.total
                "
              />
            </td>
            <td>
              {{
                reportData[`${radioHydroModel}`]['rcp85'][`${season}`][
                  `${variable}`
                ].late_century.total
              }}
              <UnitWidget variable="hydro" />
              <HydroDiffWidget
                :past="
                  reportData[`${radioHydroModel}`]['rcp45'][`${season}`][
                    `${variable}`
                  ].historical.total
                "
                :future="
                  reportData[`${radioHydroModel}`]['rcp85'][`${season}`][
                    `${variable}`
                  ].late_century.total
                "
              />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="8" class="about">
              Values show averages for the indicated date ranges. Bold text
              indicates greater change.
              <nuxt-link :to="{ name: 'about' }"
                >Read more about models and emissions scenarios.</nuxt-link
              >
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<style></style>
<script>
import UnitWidget from '~/components/UnitWidget'
import HydroDiffWidget from '~/components/reports/hydrology/HydroDiffWidget'
import { mapGetters } from 'vuex'

export default {
  name: 'ReportHydrologyTables',
  components: {
    UnitWidget,
    HydroDiffWidget,
  },
  computed: {
    ...mapGetters({
      units: 'units',
      place: 'place/name',
      vars: 'hydrology/vars',
      reportData: 'hydrology/hydrologyData',
    }),
  },
  methods: {
    mapVariables(variable) {
      return this.vars[variable]
    },
  },
  data() {
    return {
      radioHydroModel: 'CanESM2',
    }
  },
}
</script>
