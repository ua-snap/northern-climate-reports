<template>
	<span><span class="units" v-if="variable == 'temp'"><span v-if="units == 'imperial' && type == 'heavy'">(&deg;F)</span><span v-if="units == 'imperial' && type == 'light'":class="{ light: type == 'light' }">&deg;F</span ><span v-if="units == 'metric' && type == 'heavy'">(&deg;C)</span><span v-if="units == 'metric' && type == 'light'":class="{ light: type == 'light' }">&deg;C</span ></span><span class="units" v-if="variable == 'pr'"><span v-if="units == 'imperial' && type == 'heavy'">(in)</span><span v-if="units == 'imperial' && type == 'light'":class="{ light: type == 'light' }">in</span ><span v-if="units == 'metric' && type == 'heavy'">(&#x339C;)</span><span v-if="units == 'metric' && type == 'light'":class="{ light: type == 'light' }">&#x339C;</span ></span></span>
</template>
<style lang="scss" scoped>
	.light {
		color: #888;
	}
</style>
<script>
// Important note -- the Template block above must have NO SPACES otherwise the
// whitespace creates an awkward gap in the rendered content.  Don't auto-format
// this file with JS Prettier!
export default {
	name: 'UnitWidget',
	props: {
		variable: {
			type: String,
			default: 'temp' // or pr for precip
		},
		units: {
			type: String,
			required: true,
		},
		// Type can be "light" (no parentheses) or "heavy" (parens).
		type: {
			type: String,
			default: 'light',
		},
	},
}
</script>
