<template>
  <div class="report--temperature">
    <table class="table report-table" v-if="reportData">
      <caption>
        Temperature,
        <span v-html="place"></span>, 1950&ndash;2099
      </caption>
      <thead>
        <tr>
          <th scope="col" rowspan="3" class="left">Season</th>
          <th scope="col" rowspan="3" class="left">
            Historical (1988&ndash;2017)
          </th>
          <th scope="col" colspan="4" class="light-border">
            Mid&ndash;Century (2040&ndash;2069)
          </th>
          <th scope="col" colspan="4" class="light-border">
            Long&ndash;Term (2070&ndash;2099)
          </th>
        </tr>
        <tr>
          <th scope="col" colspan="2" class="light-border">
            Low Emissions (RCP 4.5)
          </th>
          <th scope="col" colspan="2" class="light-border">
            High Emissions (RCP 8.5)
          </th>
          <th scope="col" colspan="2" class="light-border">
            Low Emissions (RCP 4.5)
          </th>
          <th scope="col" colspan="2" class="light-border">
            High Emissions (RCP 8.5)
          </th>
        </tr>
        <tr class="models">
          <th scope="col">MRI CGCM3</th>
          <th scope="col">NCAR CCSM4</th>
          <th scope="col">MRI CGCM3</th>
          <th scope="col">NCAR CCSM4</th>
          <th scope="col">MRI CGCM3</th>
          <th scope="col">NCAR CCSM4</th>
          <th scope="col">MRI CGCM3</th>
          <th scope="col">NCAR CCSM4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">cd</th>
          <td class="left">
            {{
              reportData['cd']['historical']['daymet']['historical']['mean']
            }}<UnitWidget />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['MRI-CGCM3']['rcp45']["mean"]
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['MRI-CGCM3']['rcp45']["mean"]
              "
              :past="
                reportData['cd']['historical']['daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['NCAR-CCSM4']['rcp45']["mean"]
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['NCAR-CCSM4']['rcp45']["mean"]
              "
              :past="
                reportData['cd']['historical']['daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['MRI-CGCM3']['rcp85']["mean"]
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['MRI-CGCM3']['rcp85']["mean"]
              "
              :past="
                reportData['cd']['historical']['daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['NCAR-CCSM4']['rcp85']["mean"]
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['NCAR-CCSM4']['rcp85']["mean"]
              "
              :past="
                reportData['cd']['historical']['daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['MRI-CGCM3']['rcp45']["mean"]
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['MRI-CGCM3']['rcp45']["mean"]
              "
              :past="
                reportData['cd']['historical']['daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['NCAR-CCSM4']['rcp45']["mean"]
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['NCAR-CCSM4']['rcp45']["mean"]
              "
              :past="
                reportData['cd']['historical']['daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['MRI-CGCM3']['rcp85']["mean"]
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['MRI-CGCM3']['rcp85']["mean"]
              "
              :past="
                reportData['cd']['historical']['daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['NCAR-CCSM4']['rcp85']["mean"]
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['NCAR-CCSM4']['rcp85']["mean"]
              "
              :past="
                reportData['cd']['historical']['daymet']['historical']['mean']
              "
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="10" class="about">
            Values show averages for the indicated date ranges. Red text means
            warmer temperatures.
            <nuxt-link :to="{ name: 'about' }"
              >Read more about models and emissions scenarios.</nuxt-link
            >
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<style lang="scss" scoped>
// Styles for this are in assets/scss/main.scss.
</style>
<script>
import UnitWidget from '~/components/UnitWidget'
import TempDiffWidget from './TempDiffWidget'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportTempIndicatorsTable',
  components: { UnitWidget, TempDiffWidget },
  computed: {
    ...mapGetters({
      reportData: 'indicators/indicatorData',
      place: 'place/name',
    }),
  },
}
</script>
