<template>
  <div class="report--beetles">
    <table class="table report-table" v-if="reportData">
      <caption>
        <div>
          Spruce Beetle Risk,
          {{ snowpack.charAt(0).toUpperCase() + snowpack.slice(1) }}
          Snowpack,
          <span v-html="place"></span>, 1988&ndash;2099
        </div>
        <div class="historical">
          Historical modeled risk (Daymet, 1988&ndash;2017) is
          <strong>{{
            reportData['1988-2017']['Daymet']['Historical']['low'][
              'beetle-risk'
            ]
          }}</strong
          >.
        </div>
      </caption>
      <thead>
        <tr>
          <th scope="col" rowspan="2" class="left">Model</th>
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
          <th scope="col">RCP 4.5</th>
          <th scope="col">RCP 8.5</th>
          <th scope="col">RCP 4.5</th>
          <th scope="col">RCP 8.5</th>
          <th scope="col">RCP 4.5</th>
          <th scope="col">RCP 8.5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">NCAR CCSM4</th>
          <td>
            {{
              reportData['2010-2039']['NCAR-CCSM4']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2010-2039']['NCAR-CCSM4']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2040-2069']['NCAR-CCSM4']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2040-2069']['NCAR-CCSM4']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2070-2099']['NCAR-CCSM4']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2070-2099']['NCAR-CCSM4']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
        </tr>
        <tr>
          <th scope="row">GFDL ESM2M</th>
          <td>
            {{
              reportData['2010-2039']['GFDL-ESM2M']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2010-2039']['GFDL-ESM2M']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2040-2069']['GFDL-ESM2M']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2040-2069']['GFDL-ESM2M']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2070-2099']['GFDL-ESM2M']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2070-2099']['GFDL-ESM2M']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
        </tr>
        <tr>
          <th scope="row">HadGEM2 ES</th>
          <td>
            {{
              reportData['2010-2039']['HadGEM2-ES']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2010-2039']['HadGEM2-ES']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2040-2069']['HadGEM2-ES']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2040-2069']['HadGEM2-ES']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2070-2099']['HadGEM2-ES']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2070-2099']['HadGEM2-ES']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
        </tr>
        <tr>
          <th scope="row">MRI CGCM3</th>
          <td>
            {{
              reportData['2010-2039']['MRI-CGCM3']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2010-2039']['MRI-CGCM3']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2040-2069']['MRI-CGCM3']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2040-2069']['MRI-CGCM3']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2070-2099']['MRI-CGCM3']['rcp45'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
          <td>
            {{
              reportData['2070-2099']['MRI-CGCM3']['rcp85'][snowpack][
                'beetle-risk'
              ]
            }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="7" class="about left">
            Values show spruce beetle risk for the indicated date ranges over
            all models and emission scenarios.
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
td {
  text-align: center !important;
  vertical-align: bottom;
}
.left.about {
  text-align: left !important;
}
.historical {
  font-size: 1.2rem;
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ReportBeetleRiskTable',
  props: ['snowpack'],
  computed: {
    ...mapGetters({
      reportData: 'beetle/beetleData',
      place: 'place/name',
    }),
  },
}
</script>
