<template>
  <div class="report--precipitation-indicators">
    <table class="table report-table" v-if="reportData">
      <caption>
        Precipitation Indicators,
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
          <th scope="row">Maximum 1-day Precipitation</th>
          <td class="left">
            {{
              reportData['rx1day']['historical']['Daymet']['historical'][
                'mean'
              ]
            }}<UnitWidget variable="pr" type="light" />
          </td>
          <td>
            {{ reportData['rx1day']['midcentury']['MRI-CGCM3']['rcp45']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx1day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx1day']['midcentury']['MRI-CGCM3']['rcp45']['mean']
              "
            />
          </td>
          <td>
            {{
              reportData['rx1day']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx1day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx1day']['midcentury']['NCAR-CCSM4']['rcp45'][
                  'mean'
                ]
              "
            />
          </td>
          <td>
            {{ reportData['rx1day']['midcentury']['MRI-CGCM3']['rcp85']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx1day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx1day']['midcentury']['MRI-CGCM3']['rcp85']['mean']
              "
            />
          </td>
          <td>
            {{
              reportData['rx1day']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx1day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx1day']['midcentury']['NCAR-CCSM4']['rcp85'][
                  'mean'
                ]
              "
            />
          </td>
          <td>
            {{ reportData['rx1day']['longterm']['MRI-CGCM3']['rcp45']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx1day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx1day']['longterm']['MRI-CGCM3']['rcp45']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['rx1day']['longterm']['NCAR-CCSM4']['rcp45']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx1day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx1day']['longterm']['NCAR-CCSM4']['rcp45']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['rx1day']['longterm']['MRI-CGCM3']['rcp85']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx1day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx1day']['longterm']['MRI-CGCM3']['rcp85']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['rx1day']['longterm']['NCAR-CCSM4']['rcp85']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx1day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx1day']['longterm']['NCAR-CCSM4']['rcp85']['mean']
              "
            />
          </td>
        </tr>
        <tr>
          <th scope="row">Maximum 5-day Precipitation</th>
          <td class="left">
            {{
              reportData['rx5day']['historical']['Daymet']['historical'][
                'mean'
              ]
            }}<UnitWidget variable="pr" type="light" />
          </td>
          <td>
            {{ reportData['rx5day']['midcentury']['MRI-CGCM3']['rcp45']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx5day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx5day']['midcentury']['MRI-CGCM3']['rcp45']['mean']
              "
            />
          </td>
          <td>
            {{
              reportData['rx5day']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx5day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx5day']['midcentury']['NCAR-CCSM4']['rcp45'][
                  'mean'
                ]
              "
            />
          </td>
          <td>
            {{ reportData['rx5day']['midcentury']['MRI-CGCM3']['rcp85']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx5day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx5day']['midcentury']['MRI-CGCM3']['rcp85']['mean']
              "
            />
          </td>
          <td>
            {{
              reportData['rx5day']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx5day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx5day']['midcentury']['NCAR-CCSM4']['rcp85'][
                  'mean'
                ]
              "
            />
          </td>
          <td>
            {{ reportData['rx5day']['longterm']['MRI-CGCM3']['rcp45']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx5day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx5day']['longterm']['MRI-CGCM3']['rcp45']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['rx5day']['longterm']['NCAR-CCSM4']['rcp45']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx5day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx5day']['longterm']['NCAR-CCSM4']['rcp45']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['rx5day']['longterm']['MRI-CGCM3']['rcp85']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx5day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx5day']['longterm']['MRI-CGCM3']['rcp85']['mean']
              "
            />
          </td>
          <td>
            {{ reportData['rx5day']['longterm']['NCAR-CCSM4']['rcp85']['mean']
            }}<UnitWidget variable="pr" type="light" /><PrecipDiffWidget
              :past="
                reportData['rx5day']['historical']['Daymet']['historical'][
                  'mean'
                ]
              "
              :future="
                reportData['rx5day']['longterm']['NCAR-CCSM4']['rcp85']['mean']
              "
            />
          </td>
        </tr>
        <tr>
          <th scope="row">Consecutive Wet Days</th>
          <td class="left">
            {{
              reportData['cwd']['historical']['Daymet']['historical']['mean']
            }}
          </td>
          <td>
            {{ reportData['cwd']['midcentury']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['cwd']['midcentury']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['cwd']['midcentury']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['cwd']['midcentury']['NCAR-CCSM4']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['cwd']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['cwd']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['cwd']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['cwd']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
          </td>
        </tr>
        <tr>
          <th scope="row">Consecutive Dry Days</th>
          <td class="left">
            {{
              reportData['cdd']['historical']['Daymet']['historical']['mean']
            }}
          </td>
          <td>
            {{ reportData['cdd']['midcentury']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['cdd']['midcentury']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['cdd']['midcentury']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['cdd']['midcentury']['NCAR-CCSM4']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['cdd']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['cdd']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['cdd']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['cdd']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
          </td>
        </tr>
        <tr>
          <th scope="row">Number of heavy precipitation days > 10mm</th>
          <td class="left">
            {{
              reportData['r10mm']['historical']['Daymet']['historical']['mean']
            }}
          </td>
          <td>
            {{
              reportData['r10mm']['midcentury']['MRI-CGCM3']['rcp45']['mean']
            }}
          </td>
          <td>
            {{
              reportData['r10mm']['midcentury']['NCAR-CCSM4']['rcp45']['mean']
            }}
          </td>
          <td>
            {{
              reportData['r10mm']['midcentury']['MRI-CGCM3']['rcp85']['mean']
            }}
          </td>
          <td>
            {{
              reportData['r10mm']['midcentury']['NCAR-CCSM4']['rcp85']['mean']
            }}
          </td>
          <td>
            {{ reportData['r10mm']['longterm']['MRI-CGCM3']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['r10mm']['longterm']['NCAR-CCSM4']['rcp45']['mean'] }}
          </td>
          <td>
            {{ reportData['r10mm']['longterm']['MRI-CGCM3']['rcp85']['mean'] }}
          </td>
          <td>
            {{ reportData['r10mm']['longterm']['NCAR-CCSM4']['rcp85']['mean'] }}
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
import PrecipDiffWidget from './PrecipDiffWidget'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportPrecipIndicatorsTable',
  components: { UnitWidget, PrecipDiffWidget },
  computed: {
    ...mapGetters({
      reportData: 'indicators/indicatorData',
      place: 'place/name',
    }),
  },
}
</script>
