<template>
  <div class="report--temperature-indicators" v-if="reportData">
    <div class="content">
      <h4 class="title is-4 mt-6">Temperature Indicators</h4>
      <div class="is-size-5">
        &ldquo;Indicators&rdquo; are a tool that help us understand data. We can
        link indicators to specific impacts or risks.
      </div>
    </div>
    <table class="table report-table mb-0">
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
          <th scope="row">
            Very Cold Day Threshold
            <span class="description"
              >Only 5 days in a year are colder than this</span
            >
          </th>
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
          <th scope="row">
            Very Hot Day Threshold
            <span class="description"
              >Only 5 days in a year are warmer than this</span
            >
          </th>
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
          <th scope="row">
            Summer Days
            <span class="description"
              >Temperature above {{ suValue }}<UnitWidget type="light"
            /></span>
          </th>
          <td class="left">
            {{ reportData['su']['historical']['Daymet']['historical']['mean'] }}
          </td>
          <td>
            {{ reportData['su']['midcentury']['MRI-CGCM3']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['su']['midcentury']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['su']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['su']['midcentury']['NCAR-CCSM4']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['su']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['su']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['su']['midcentury']['MRI-CGCM3']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['su']['midcentury']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['su']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['su']['midcentury']['NCAR-CCSM4']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['su']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['su']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['su']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['su']['longterm']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['su']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['su']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['su']['longterm']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['su']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['su']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['su']['longterm']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['su']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['su']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['su']['longterm']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['su']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
        </tr>
        <tr>
          <th scope="row">
            Deep Winter Days
            <span class="description"
              >Temperature below {{ dwValue }}<UnitWidget type="light"
            /></span>
          </th>
          <td class="left">
            {{ reportData['dw']['historical']['Daymet']['historical']['mean'] }}
          </td>
          <td>
            {{ reportData['dw']['midcentury']['MRI-CGCM3']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['dw']['midcentury']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['dw']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['dw']['midcentury']['NCAR-CCSM4']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['dw']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['dw']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['dw']['midcentury']['MRI-CGCM3']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['dw']['midcentury']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['dw']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['dw']['midcentury']['NCAR-CCSM4']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['dw']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['dw']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['dw']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['dw']['longterm']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['dw']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['dw']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['dw']['longterm']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['dw']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['dw']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['dw']['longterm']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['dw']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['dw']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['dw']['longterm']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['dw']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
        </tr>
        <tr>
          <th scope="row">
            Warm Spell Duration Index
            <span class="description"
              >Heat wave metric: the number of hot days (&gt;&#8239;90<sup
                >th</sup
              >
              percentile) occurring in a row following an initial warm spell
              period of six days.
            </span>
          </th>
          <td class="left">
            {{
              reportData['wsdi']['historical']['Daymet']['historical']['mean']
            }}
          </td>
          <td>
            {{ reportData['wsdi']['midcentury']['MRI-CGCM3']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['wsdi']['midcentury']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['wsdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{
              reportData['wsdi']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
            }}
            <DayDiffWidget
              :future="
                reportData['wsdi']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['wsdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['wsdi']['midcentury']['MRI-CGCM3']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['wsdi']['midcentury']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['wsdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>

          <td>
            {{
              reportData['wsdi']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
            }}
            <DayDiffWidget
              :future="
                reportData['wsdi']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['wsdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['wsdi']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['wsdi']['longterm']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['wsdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['wsdi']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['wsdi']['longterm']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['wsdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['wsdi']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['wsdi']['longterm']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['wsdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['wsdi']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['wsdi']['longterm']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['wsdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
        </tr>
        <tr>
          <th scope="row">
            Cold Spell Duration Index
            <span class="description"
              >Cold spell metric: the number of cold days (&lt;&#8239;10<sup
                >th</sup
              >
              percentile) occurring in a row following an initial cold spell
              period of six days.
            </span>
          </th>
          <td class="left">
            {{
              reportData['csdi']['historical']['Daymet']['historical']['mean']
            }}
          </td>
          <td>
            {{ reportData['csdi']['midcentury']['MRI-CGCM3']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['csdi']['midcentury']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['csdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{
              reportData['csdi']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
            }}
            <DayDiffWidget
              :future="
                reportData['csdi']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['csdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['csdi']['midcentury']['MRI-CGCM3']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['csdi']['midcentury']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['csdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{
              reportData['csdi']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
            }}
            <DayDiffWidget
              :future="
                reportData['csdi']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['csdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['csdi']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['csdi']['longterm']['MRI-CGCM3']['rcp45']['mean']
              "
              :past="
                reportData['csdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['csdi']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['csdi']['longterm']['NCAR-CCSM4']['rcp45']['mean']
              "
              :past="
                reportData['csdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['csdi']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['csdi']['longterm']['MRI-CGCM3']['rcp85']['mean']
              "
              :past="
                reportData['csdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['csdi']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
            <DayDiffWidget
              :future="
                reportData['csdi']['longterm']['NCAR-CCSM4']['rcp85']['mean']
              "
              :past="
                reportData['csdi']['historical']['Daymet']['historical']['mean']
              "
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="10" class="about">
            Values indicate mean values for the time range specified. Red text
            means warmer, blue means colder. Bold text indicates greater change.
            <nuxt-link :to="{ name: 'data' }"
              >Read more about the dataset and processing used to generate these
              data.</nuxt-link
            >
          </td>
        </tr>
      </tfoot>
    </table>
    <DownloadCsvButton
      text="Download temperature indicators data as CSV"
      endpoint="indicators"
      class="mt-3 mb-5"
    />
  </div>
</template>
<style lang="scss" scoped>
// Styles for this are in assets/scss/main.scss.
</style>
<script>
import UnitWidget from '~/components/UnitWidget'
import TempDiffWidget from './TempDiffWidget'
import DayDiffWidget from '../DayDiffWidget'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'
import { mapGetters } from 'vuex'
import { convertValueToFahrenheit } from '~/utils/convert'

export default {
  name: 'ReportTempIndicatorsTable',
  components: { UnitWidget, TempDiffWidget, DayDiffWidget, DownloadCsvButton },
  computed: {
    // Summer days fixed threshold value 25ºC
    suValue() {
      return this.units == 'imperial' ? convertValueToFahrenheit(25) : 25
    },
    // Deep winter days fixed threshold value -30ºC
    dwValue() {
      return this.units == 'imperial' ? convertValueToFahrenheit(-30) : -30
    },
    ...mapGetters({
      units: 'units',
      reportData: 'indicators/indicatorData',
      place: 'place/name',
    }),
  },
}
</script>
