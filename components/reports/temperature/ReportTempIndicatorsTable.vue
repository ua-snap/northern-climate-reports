<template>
  <div class="report--temperature-indicators" v-if="reportData">
    <div class="content">
      <h4 class="title is-4 mt-6">Temperature Indicators</h4>
      <div class="is-size-5">
        &ldquo;Indicators&rdquo; are a tool that help us understand data. We can
        link indicators to specific impacts or risks.
      </div>
    </div>
    <table class="table report-table">
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
            Very Cold Day Threshold<br />
            <span class="description"
              >Only 5 days in a year are colder than this</span
            >
          </th>
          <td class="left">
            {{ reportData['cd']['historical']['Daymet']['historical']['min']
            }}<UnitWidget />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['MRI-CGCM3']['rcp45']['min']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['MRI-CGCM3']['rcp45']['min']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['min']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['NCAR-CCSM4']['rcp45']['min']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['NCAR-CCSM4']['rcp45']['min']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['min']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['MRI-CGCM3']['rcp85']['min']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['MRI-CGCM3']['rcp85']['min']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['min']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['midcentury']['NCAR-CCSM4']['rcp85']['min']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['midcentury']['NCAR-CCSM4']['rcp85']['min']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['min']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['MRI-CGCM3']['rcp45']['min']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['MRI-CGCM3']['rcp45']['min']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['min']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['NCAR-CCSM4']['rcp45']['min']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['NCAR-CCSM4']['rcp45']['min']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['min']
              "
            />
          </td>
          <td>
            {{ reportData['cd']['longterm']['MRI-CGCM3']['rcp85']['min']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['cd']['longterm']['MRI-CGCM3']['rcp85']['min']
              "
              :past="
                reportData['cd']['historical']['Daymet']['historical']['min']
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
            Very Hot Day Threshold<br />
            <span class="description"
              >Only 5 days in a year are warmer than this</span
            >
          </th>
          <td class="left">
            {{ reportData['hd']['historical']['Daymet']['historical']['max']
            }}<UnitWidget />
          </td>
          <td>
            {{ reportData['hd']['midcentury']['MRI-CGCM3']['rcp45']['max']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['midcentury']['MRI-CGCM3']['rcp45']['max']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['max']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['midcentury']['NCAR-CCSM4']['rcp45']['max']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['midcentury']['NCAR-CCSM4']['rcp45']['max']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['max']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['midcentury']['MRI-CGCM3']['rcp85']['max']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['midcentury']['MRI-CGCM3']['rcp85']['max']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['max']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['midcentury']['NCAR-CCSM4']['rcp85']['max']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['midcentury']['NCAR-CCSM4']['rcp85']['max']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['max']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['longterm']['MRI-CGCM3']['rcp45']['max']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['longterm']['MRI-CGCM3']['rcp45']['max']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['max']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['longterm']['NCAR-CCSM4']['rcp45']['max']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['longterm']['NCAR-CCSM4']['rcp45']['max']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['max']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['longterm']['MRI-CGCM3']['rcp85']['max']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['longterm']['MRI-CGCM3']['rcp85']['max']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['max']
              "
            />
          </td>
          <td>
            {{ reportData['hd']['longterm']['NCAR-CCSM4']['rcp85']['max']
            }}<UnitWidget /><TempDiffWidget
              :future="
                reportData['hd']['longterm']['NCAR-CCSM4']['rcp85']['max']
              "
              :past="
                reportData['hd']['historical']['Daymet']['historical']['max']
              "
            />
          </td>
        </tr>
        <tr>
          <th scope="row">
            Summer Days<br />
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
            Deep Winter Days<br />
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
            Warm Spell Duration Index<br />
            <span class="description"
              >How many hot days in excess of 6-day periods?
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
            Cold Spell Duration Index<br />
            <span class="description"
              >How many cold days in excess of 6-day periods?
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
            This table lists some climate indicators derived from a wide range
            of models.
            <nuxt-link :to="{ name: 'about' }"
              >Read more about the dataset and processing used to generate these
              data.</nuxt-link
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
import DayDiffWidget from '../DayDiffWidget'
import { mapGetters } from 'vuex'
import { convertValueToFahrenheit } from '~/utils/convert'

export default {
  name: 'ReportTempIndicatorsTable',
  components: { UnitWidget, TempDiffWidget, DayDiffWidget },
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
