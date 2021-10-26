<template>
	<span
		class="diff"
		:class="{ warmer: rawDiff > 0, zero: rawDiff == 0, cooler: rawDiff < 0 }"
		v-html="diff"
	></span>
</template>
<style lang="scss" scoped>
.diff {
	display: block;

	&.warmer {
		color: #ad1f00;
	}
	&.cooler {
		color: blue;
	}
}
</style>
<script>
// Important note -- the Template block above must have NO SPACES otherwise the
// whitespace creates an awkward gap in the rendered content.  Don't auto-format
// this file with JS Prettier!
export default {
	name: 'TempDiffWidget',
	props: {
		future: {
			type: Number,
			required: true,
		},
		past: {
			type: Number,
			required: true,
		},
	},
	computed: {
		rawDiff() {
			return (this.future - this.past).toFixed(1)
		},
		diff() {
			let diff = (this.future - this.past).toFixed(1)
			if (diff > 0) {
				diff = '&plus;' + diff
			}
			return diff
		},
	},
}
</script>
