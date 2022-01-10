<template>
	<div class="report--temperature">
		<table class="table report-table" v-if="reportData">
			<caption>
				Projected Temperatures
				<UnitWidget :units="units" type="heavy" />
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
							reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical'][
								'tas'
							]['mean']
						}}<UnitWidget :units="units" />
					</td>
					<td>
						{{ reportData['2040_2069']['DJF']['MRI-CGCM3']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2040_2069']['DJF']['MRI-CGCM3']['rcp45']['tas']
							"
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['DJF']['CCSM4']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2040_2069']['DJF']['CCSM4']['rcp45']['tas']"
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['DJF']['MRI-CGCM3']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2040_2069']['DJF']['MRI-CGCM3']['rcp85']['tas']
							"
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['DJF']['CCSM4']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2040_2069']['DJF']['CCSM4']['rcp85']['tas']"
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['DJF']['MRI-CGCM3']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2070_2099']['DJF']['MRI-CGCM3']['rcp45']['tas']
							"
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['DJF']['CCSM4']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2070_2099']['DJF']['CCSM4']['rcp45']['tas']"
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['DJF']['MRI-CGCM3']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2070_2099']['DJF']['MRI-CGCM3']['rcp85']['tas']
							"
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['DJF']['CCSM4']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2070_2099']['DJF']['CCSM4']['rcp85']['tas']"
							:past="
								reportData['1950_2009']['DJF']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
				</tr>
				<tr>
					<th scope="row">Spring</th>
					<td class="left">
						{{
							reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical'][
								'tas'
							]['mean']
						}}<UnitWidget :units="units" />
					</td>
					<td>
						{{ reportData['2040_2069']['MAM']['MRI-CGCM3']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2040_2069']['MAM']['MRI-CGCM3']['rcp45']['tas']
							"
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['MAM']['CCSM4']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2040_2069']['MAM']['CCSM4']['rcp45']['tas']"
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['MAM']['MRI-CGCM3']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2040_2069']['MAM']['MRI-CGCM3']['rcp85']['tas']
							"
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['MAM']['CCSM4']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2040_2069']['MAM']['CCSM4']['rcp85']['tas']"
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['MAM']['MRI-CGCM3']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2070_2099']['MAM']['MRI-CGCM3']['rcp45']['tas']
							"
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['MAM']['CCSM4']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2070_2099']['MAM']['CCSM4']['rcp45']['tas']"
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['MAM']['MRI-CGCM3']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2070_2099']['MAM']['MRI-CGCM3']['rcp85']['tas']
							"
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['MAM']['CCSM4']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2070_2099']['MAM']['CCSM4']['rcp85']['tas']"
							:past="
								reportData['1950_2009']['MAM']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
				</tr>
				<tr>
					<th scope="row">Summer</th>
					<td class="left">
						{{
							reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical'][
								'tas'
							]['mean']
						}}<UnitWidget :units="units" />
					</td>
					<td>
						{{ reportData['2040_2069']['JJA']['MRI-CGCM3']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2040_2069']['JJA']['MRI-CGCM3']['rcp45']['tas']
							"
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['JJA']['CCSM4']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2040_2069']['JJA']['CCSM4']['rcp45']['tas']"
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['JJA']['MRI-CGCM3']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2040_2069']['JJA']['MRI-CGCM3']['rcp85']['tas']
							"
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['JJA']['CCSM4']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2040_2069']['JJA']['CCSM4']['rcp85']['tas']"
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['JJA']['MRI-CGCM3']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2070_2099']['JJA']['MRI-CGCM3']['rcp45']['tas']
							"
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['JJA']['CCSM4']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2070_2099']['JJA']['CCSM4']['rcp45']['tas']"
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['JJA']['MRI-CGCM3']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2070_2099']['JJA']['MRI-CGCM3']['rcp85']['tas']
							"
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['JJA']['CCSM4']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2070_2099']['JJA']['CCSM4']['rcp85']['tas']"
							:past="
								reportData['1950_2009']['JJA']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
				</tr>
				<tr>
					<th scope="row">Fall</th>
					<td class="left">
						{{
							reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical'][
								'tas'
							]['mean']
						}}<UnitWidget :units="units" />
					</td>
					<td>
						{{ reportData['2040_2069']['SON']['MRI-CGCM3']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2040_2069']['SON']['MRI-CGCM3']['rcp45']['tas']
							"
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['SON']['CCSM4']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2040_2069']['SON']['CCSM4']['rcp45']['tas']"
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['SON']['MRI-CGCM3']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2040_2069']['SON']['MRI-CGCM3']['rcp85']['tas']
							"
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2040_2069']['SON']['CCSM4']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2040_2069']['SON']['CCSM4']['rcp85']['tas']"
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['SON']['MRI-CGCM3']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2070_2099']['SON']['MRI-CGCM3']['rcp45']['tas']
							"
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['SON']['CCSM4']['rcp45']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2070_2099']['SON']['CCSM4']['rcp45']['tas']"
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['SON']['MRI-CGCM3']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="
								reportData['2070_2099']['SON']['MRI-CGCM3']['rcp85']['tas']
							"
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
						/>
					</td>
					<td>
						{{ reportData['2070_2099']['SON']['CCSM4']['rcp85']['tas']
						}}<UnitWidget :units="units" /><TempDiffWidget
							:future="reportData['2070_2099']['SON']['CCSM4']['rcp85']['tas']"
							:past="
								reportData['1950_2009']['SON']['CRU-TS40']['CRU_historical'][
									'tas'
								]['mean']
							"
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
// Styles for this are in assets/scss/main.scss.
</style>
<script>
import UnitWidget from '~/components/UnitWidget'
import TempDiffWidget from './TempDiffWidget'
export default {
	name: 'ReportTempTable',
	props: ['reportData', 'units'],
	components: { UnitWidget, TempDiffWidget },
}
</script>
