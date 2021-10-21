<template>
	<div class="report">
		<table class="table" v-if="reportData">
			<thead>
				<tr>
					<th scope="col" colspan="2"></th>
					<th scope="col" colspan="4">2040&ndash;2070</th>
					<th scope="col" colspan="4">2070&ndash;2100</th>
				</tr>
				<tr>
					<th scope="col" colspan="2"></th>
					<th scope="col" colspan="2">RCP4.5</th>
					<th scope="col" colspan="2">RCP8.5</th>
					<th scope="col" colspan="2">RCP4.5</th>
					<th scope="col" colspan="2">RCP8.5</th>
				</tr>
				<tr>
					<th scope="col">Season</th>
					<th scope="col">Historical Average</th>
					<th scope="col">MRI-CGCM3</th>
					<th scope="col">NCAR-CCSM4</th>
					<th scope="col">MRI-CGCM3</th>
					<th scope="col">NCAR-CCSM4</th>
					<th scope="col">MRI-CGCM3</th>
					<th scope="col">NCAR-CCSM4</th>
					<th scope="col">MRI-CGCM3</th>
					<th scope="col">NCAR-CCSM4</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">Winter</th>
					<td>
						{{
							reportData['1910-2009']['DJF']['CRU-TS31']['CRU_historical'][
								variable
							]
						}}
						<span class="units">
							<span v-if="units == 'imperial' && variable == 'tas'">(&deg;F)</span>
							<span v-if="units == 'metric' && variable == 'tas'">(&deg;C)</span>
							<span v-if="units == 'imperial' && variable == 'pr'">(in)</span>
							<span v-if="units == 'metric' && variable == 'pr'">(mm)</span>
						</span>
					</td>
					<td>
						{{ reportData['2040_2070']['DJF']['MRI-CGCM3']['rcp45'][variable] }}
					</td>
					<td>{{ reportData['2040_2070']['DJF']['CCSM4']['rcp45'][variable] }}</td>
					<td>
						{{ reportData['2040_2070']['DJF']['MRI-CGCM3']['rcp85'][variable] }}
					</td>
					<td>{{ reportData['2040_2070']['DJF']['CCSM4']['rcp85'][variable] }}</td>
					<td>
						{{ reportData['2070_2100']['DJF']['MRI-CGCM3']['rcp45'][variable] }}
					</td>
					<td>{{ reportData['2070_2100']['DJF']['CCSM4']['rcp45'][variable] }}</td>
					<td>
						{{ reportData['2070_2100']['DJF']['MRI-CGCM3']['rcp85'][variable] }}
					</td>
					<td>{{ reportData['2070_2100']['DJF']['CCSM4']['rcp85'][variable] }}</td>
				</tr>
				<tr>
					<th scope="row">Spring</th>
					<td>
						{{
							reportData['1910-2009']['MAM']['CRU-TS31']['CRU_historical'][
								variable
							]
						}}
					</td>
					<td>
						{{ reportData['2040_2070']['MAM']['MRI-CGCM3']['rcp45'][variable] }}
					</td>
					<td>{{ reportData['2040_2070']['MAM']['CCSM4']['rcp45'][variable] }}</td>
					<td>
						{{ reportData['2040_2070']['MAM']['MRI-CGCM3']['rcp85'][variable] }}
					</td>
					<td>{{ reportData['2040_2070']['MAM']['CCSM4']['rcp85'][variable] }}</td>
					<td>
						{{ reportData['2070_2100']['MAM']['MRI-CGCM3']['rcp45'][variable] }}
					</td>
					<td>{{ reportData['2070_2100']['MAM']['CCSM4']['rcp45'][variable] }}</td>
					<td>
						{{ reportData['2070_2100']['MAM']['MRI-CGCM3']['rcp85'][variable] }}
					</td>
					<td>{{ reportData['2070_2100']['MAM']['CCSM4']['rcp85'][variable] }}</td>
				</tr>
				<tr>
					<th scope="row">Summer</th>
					<td>
						{{
							reportData['1910-2009']['JJA']['CRU-TS31']['CRU_historical'][
								variable
							]
						}}
					</td>
					<td>
						{{ reportData['2040_2070']['JJA']['MRI-CGCM3']['rcp45'][variable] }}
					</td>
					<td>{{ reportData['2040_2070']['JJA']['CCSM4']['rcp45'][variable] }}</td>
					<td>
						{{ reportData['2040_2070']['JJA']['MRI-CGCM3']['rcp85'][variable] }}
					</td>
					<td>{{ reportData['2040_2070']['JJA']['CCSM4']['rcp85'][variable] }}</td>
					<td>
						{{ reportData['2070_2100']['JJA']['MRI-CGCM3']['rcp45'][variable] }}
					</td>
					<td>{{ reportData['2070_2100']['JJA']['CCSM4']['rcp45'][variable] }}</td>
					<td>
						{{ reportData['2070_2100']['JJA']['MRI-CGCM3']['rcp85'][variable] }}
					</td>
					<td>{{ reportData['2070_2100']['JJA']['CCSM4']['rcp85'][variable] }}</td>
				</tr>
				<tr>
					<th scope="row">Fall</th>
					<td>
						{{
							reportData['1910-2009']['SON']['CRU-TS31']['CRU_historical'][
								variable
							]
						}}
					</td>
					<td>
						{{ reportData['2040_2070']['SON']['MRI-CGCM3']['rcp45'][variable] }}
					</td>
					<td>{{ reportData['2040_2070']['SON']['CCSM4']['rcp45'][variable] }}</td>
					<td>
						{{ reportData['2040_2070']['SON']['MRI-CGCM3']['rcp85'][variable] }}
					</td>
					<td>{{ reportData['2040_2070']['SON']['CCSM4']['rcp85'][variable] }}</td>
					<td>
						{{ reportData['2070_2100']['SON']['MRI-CGCM3']['rcp45'][variable] }}
					</td>
					<td>{{ reportData['2070_2100']['SON']['CCSM4']['rcp45'][variable] }}</td>
					<td>
						{{ reportData['2070_2100']['SON']['MRI-CGCM3']['rcp85'][variable] }}
					</td>
					<td>{{ reportData['2070_2100']['SON']['CCSM4']['rcp85'][variable] }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style lang="scss" scoped>
.report {
	margin-top: 2.25rem;
}
table.table {
	margin-top: 2.25rem;
}
</style>
<script>
export default {
	name: 'ReportTable',
	props: ['reportData', 'variable', 'units'],
}
</script>
