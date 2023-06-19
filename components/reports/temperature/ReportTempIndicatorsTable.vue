<template>
  <div class="report--temperature-indicators">
    <table class="table report-table" v-if="reportData">
      <caption>
        Temperature Indicators,
        <span v-html="place"></span
        >, 1950&ndash;2099
      </caption>
      <thead>
        <tr>
          <th scope="col" rowspan="3" class="left">Indicator</th>
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
          <th scope="row">Coldest Day</th>
          <td class="left">
            {{ reportData['cd']['historical']['Daymet']['historical']['mean']
            }}<UnitWidget />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['MRI-CGCM3']['rcp45']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['MRI-CGCM3']['rcp85']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['MRI-CGCM3']['rcp45']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['NCAR-CCSM4']['rcp45']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['MRI-CGCM3']['rcp85']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['NCAR-CCSM4']['rcp85']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
        </tr>
        <tr>
          <th scope="row">Hottest Day</th>
          <td class="left">
            {{ reportData['hd']['historical']['Daymet']['historical']['mean']
            }}<UnitWidget />
          </td>
          <td>
            {{ reportData['hd']['midcentury']['MRI-CGCM3']['rcp45']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['midcentury']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['midcentury']['MRI-CGCM3']['rcp85']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['midcentury']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['longterm']['MRI-CGCM3']['rcp45']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['longterm']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['longterm']['NCAR-CCSM4']['rcp45']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['longterm']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['longterm']['MRI-CGCM3']['rcp85']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['longterm']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['longterm']['NCAR-CCSM4']['rcp85']['mean']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['longterm']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
        </tr>
        <tr>
          <th scope="row">Summer Days</th>
          <td class="left">
            {{ reportData['su']['historical']['Daymet']['historical']['mean'] }}
          </td>
          <td>
            {{ reportData['su']['midcentury']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['su']['midcentury']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['su']['midcentury']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['su']['midcentury']['NCAR-CCSM4']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['su']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['su']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['su']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['su']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
          </td>
        </tr>
        <tr>
          <th scope="row">Deep Winter Days</th>
          <td class="left">
            {{ reportData['dw']['historical']['Daymet']['historical']['mean'] }}
          </td>
          <td>
            {{ reportData['dw']['midcentury']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['dw']['midcentury']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['dw']['midcentury']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['dw']['midcentury']['NCAR-CCSM4']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['dw']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['dw']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['dw']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['dw']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
          </td>
        </tr>
        <tr>
          <th scope="row">Warm Spell Duration Index</th>
          <td class="left">N/A</td>
          <td>
            {{ reportData['wsdi']['midcentury']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{
              reportData['wsdi']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
            }}
          </td>
          <td>
            {{ reportData['wsdi']['midcentury']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{
              reportData['wsdi']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
            }}
          </td>
          <td>
            {{ reportData['wsdi']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['wsdi']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['wsdi']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['wsdi']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
          </td>
        </tr>
        <tr>
          <th scope="row">Cold Spell Duration Index</th>
          <td class="left">N/A</td>
          <td>
            {{ reportData['csdi']['midcentury']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{
              reportData['csdi']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
            }}
          </td>
          <td>
            {{ reportData['csdi']['midcentury']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{
              reportData['csdi']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
            }}
          </td>
          <td>
            {{ reportData['csdi']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['csdi']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['csdi']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['csdi']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
          </td>
        </tr>
      </tbody>
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
