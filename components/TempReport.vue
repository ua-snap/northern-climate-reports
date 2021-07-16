<template>
	<div>
		<h4 class="subtitle is-4">Temperature</h4>
		<table class="table">
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
					<th scope="row">DJF</th>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
					<td>6</td>
					<td>7</td>
					<td>8</td>
					<td>9</td>
				</tr>
				<tr>
					<th scope="row">MAM</th>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
					<td>6</td>
					<td>7</td>
					<td>8</td>
					<td>9</td>
				</tr>
				<tr>
					<th scope="row">JJA</th>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
					<td>6</td>
					<td>7</td>
					<td>8</td>
					<td>9</td>
				</tr>
				<tr>
					<th scope="row">SON</th>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
					<td>6</td>
					<td>7</td>
					<td>8</td>
					<td>9</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style></style>
<script>
export default {
	name: 'ReportTable',
}
</script>
