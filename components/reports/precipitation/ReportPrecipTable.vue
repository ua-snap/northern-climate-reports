<template>
	<div>
		<table class="table report-table" v-if="reportData">
			<caption>
				Projected Precipitation
				<UnitWidget variable="pr" :units="units" type="heavy" />
			</caption>
			<thead>
				<tr>
					<th scope="col" rowspan="3" class="left">Season</th>
					<th scope="col" rowspan="3" class="left">Historical Average</th>
					<th scope="col" colspan="4" class="light-border">
						Mid&ndash;Century (2040&ndash;2069)
					</th>
					<th scope="col" colspan="4" class="light-border">
						Long&ndash;Term (2070&ndash;2099)
					</th>
				</tr>
				<tr>
					<th scope="col" colspan="2" class="light-border">
						Low Emissions (RCP4.5)
					</th>
					<th scope="col" colspan="2" class="light-border">
						High Emissions (RCP8.5)
					</th>
					<th scope="col" colspan="2" class="light-border">
						Low Emissions (RCP4.5)
					</th>
					<th scope="col" colspan="2" class="light-border">
						High Emissions (RCP8.5)
					</th>
				</tr>
				<tr class="models">
					<th scope="col">MRI Model</th>
					<th scope="col">NCAR Model</th>
					<th scope="col">MRI Model</th>
					<th scope="col">NCAR Model</th>
					<th scope="col">MRI Model</th>
					<th scope="col">NCAR Model</th>
					<th scope="col">MRI Model</th>
					<th scope="col">NCAR Model</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">Winter</th>
					<td class="left">
						{{
							reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical']['pr']['mean']
						}}<UnitWidget variable="pr" :units="units" type="light" />
					</td>
					<td>
						{{ reportData['2040_2070']['DJF']['MRI-CGCM3']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2040_2070']['DJF']['MRI-CGCM3']['rcp45']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['DJF']['CCSM4']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2040_2070']['DJF']['CCSM4']['rcp45']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['DJF']['MRI-CGCM3']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2040_2070']['DJF']['MRI-CGCM3']['rcp85']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['DJF']['CCSM4']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2040_2070']['DJF']['CCSM4']['rcp85']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['DJF']['MRI-CGCM3']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2070_2100']['DJF']['MRI-CGCM3']['rcp45']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['DJF']['CCSM4']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2070_2100']['DJF']['CCSM4']['rcp45']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['DJF']['MRI-CGCM3']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2070_2100']['DJF']['MRI-CGCM3']['rcp85']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['DJF']['CCSM4']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2070_2100']['DJF']['CCSM4']['rcp85']['pr']"
						/>
					</td>
				</tr>
				<tr>
					<th scope="row">Spring</th>
					<td class="left">
						{{
							reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical']['pr']['mean']
						}}<UnitWidget variable="pr" :units="units" type="light" />
					</td>
					<td>
						{{ reportData['2040_2070']['MAM']['MRI-CGCM3']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2040_2070']['MAM']['MRI-CGCM3']['rcp45']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['MAM']['CCSM4']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2040_2070']['MAM']['CCSM4']['rcp45']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['MAM']['MRI-CGCM3']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2040_2070']['MAM']['MRI-CGCM3']['rcp85']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['MAM']['CCSM4']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2040_2070']['MAM']['CCSM4']['rcp85']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['MAM']['MRI-CGCM3']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2070_2100']['MAM']['MRI-CGCM3']['rcp45']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['MAM']['CCSM4']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2070_2100']['MAM']['CCSM4']['rcp45']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['MAM']['MRI-CGCM3']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2070_2100']['MAM']['MRI-CGCM3']['rcp85']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['MAM']['CCSM4']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2070_2100']['MAM']['CCSM4']['rcp85']['pr']"
						/>
					</td>
				</tr>
				<tr>
					<th scope="row">Summer</th>
					<td class="left">
						{{
							reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical']['pr']['mean']
						}}<UnitWidget variable="pr" :units="units" type="light" />
					</td>
					<td>
						{{ reportData['2040_2070']['JJA']['MRI-CGCM3']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2040_2070']['JJA']['MRI-CGCM3']['rcp45']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['JJA']['CCSM4']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2040_2070']['JJA']['CCSM4']['rcp45']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['JJA']['MRI-CGCM3']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2040_2070']['JJA']['MRI-CGCM3']['rcp85']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['JJA']['CCSM4']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2040_2070']['JJA']['CCSM4']['rcp85']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['JJA']['MRI-CGCM3']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2070_2100']['JJA']['MRI-CGCM3']['rcp45']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['JJA']['CCSM4']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2070_2100']['JJA']['CCSM4']['rcp45']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['JJA']['MRI-CGCM3']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2070_2100']['JJA']['MRI-CGCM3']['rcp85']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['JJA']['CCSM4']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2070_2100']['JJA']['CCSM4']['rcp85']['pr']"
						/>
					</td>
				</tr>
				<tr>
					<th scope="row">Fall</th>
					<td class="left">
						{{
							reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical']['pr']['mean']
						}}<UnitWidget variable="pr" :units="units" type="light" />
					</td>
					<td>
						{{ reportData['2040_2070']['SON']['MRI-CGCM3']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2040_2070']['SON']['MRI-CGCM3']['rcp45']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['SON']['CCSM4']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2040_2070']['SON']['CCSM4']['rcp45']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['SON']['MRI-CGCM3']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2040_2070']['SON']['MRI-CGCM3']['rcp85']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2070']['SON']['CCSM4']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2040_2070']['SON']['CCSM4']['rcp85']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['SON']['MRI-CGCM3']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2070_2100']['SON']['MRI-CGCM3']['rcp45']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['SON']['CCSM4']['rcp45']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2070_2100']['SON']['CCSM4']['rcp45']['pr']"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['SON']['MRI-CGCM3']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="
								reportData['2070_2100']['SON']['MRI-CGCM3']['rcp85']['pr']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2100']['SON']['CCSM4']['rcp85']['pr']
						}}<UnitWidget
							variable="pr"
							:units="units"
							type="light"
						/><PrecipDiffWidget
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical']['pr']['mean']
							"
							:future="reportData['2070_2100']['SON']['CCSM4']['rcp85']['pr']"
						/>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="10" class="about">
						<nuxt-link :to="{ name: 'about' }"
							>Read more about models (MRI-CGCM3 and NCAR-CCSM4) and emissions
							scenarios (RCPs).</nuxt-link
						>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>
<style lang="scss" scoped>
// Styles for this table are in assets/scss/main.scss.
</style>
<script>
import UnitWidget from '~/components/UnitWidget'
import PrecipDiffWidget from './PrecipDiffWidget'
export default {
	name: 'PrecipReportTable',
	props: ['reportData', 'units'],
	components: { PrecipDiffWidget, UnitWidget },
}
</script>
