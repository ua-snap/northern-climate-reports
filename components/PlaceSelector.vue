<template>
	<div class="place-selector--wrapper">
		<h4 class="title is-5">Find a place</h4>
		<p>
			Search below by <strong>community name</strong> or
			<strong>watershed</strong> (hydrological unit name or HUC8 code).
		</p>
		<b-field>
			<b-autocomplete
				rounded
				v-model="selectedPlace"
				:data="filteredDataObj"
				keep-first
				field="name"
				placeholder="e.g. Fairbanks"
				icon="magnify"
				clearable
				clear-on-select
				@select="(option) => (selected = option)"
			>
				<template #empty>No results found</template>
				<template slot-scope="props">
					<div class="search-item">
						{{ props.option.name }}
						<span class="watershed" v-if="props.option.type == 'huc'"
							>Watershed, HUC ID {{ props.option.id }}</span
						>
						<span class="alt-name" v-if="props.option.alt_name"
							>({{ props.option.alt_name }})</span
						>
					</div>
				</template>
			</b-autocomplete>
		</b-field>
	</div>
</template>
<style lang="scss" scoped>
.place-selector--wrapper * {
	z-index: 10000;
}

.search-item {
	font-weight: 600;
	.watershed {
		text-tranform: uppercase;
		display: inline-block;
		padding-left: 1ex;
		color: #888;
	}
}
</style>
<script>
import _ from 'lodash'
import communities from '~/assets/communities'
import hucs from '~/assets/hucs'

// So it's not decorated with reactive stuff by Vue,
// we don't want that.
Object.freeze(communities)
Object.freeze(hucs)
var places = _.concat(communities, hucs)

export default {
	name: 'PlaceSelector',
	data() {
		return {
			places: places,
			selected: undefined,
			selectedPlace: '',
		}
	},
	computed: {
		filteredDataObj() {
			return this.places.filter((option) => {
				return (
					option.name
						.toString()
						.toLowerCase()
						.indexOf(this.selectedPlace.toLowerCase()) >= 0 ||
					option.alt_name
						.toString()
						.toLowerCase()
						.indexOf(this.selectedPlace.toLowerCase()) >= 0 ||
					// HUCID, check only if it's 4 digits or more
					(option.id.toString().indexOf(this.selectedPlace) >= 0 && this.selectedPlace.length > 3)
				)
			})
		},
	},
	watch: {
		selected: function (selected) {
			if (selected) {
				// If it's a HUC, route it properly...
				if (selected.type && selected.type == 'huc') {
					this.$router.push({
						path: '/report/huc/' + selected.id,
						hash: '#results',
					})
				} else {
					// It's a community point.
					this.$router.push({
						path: '/report/community/' + selected.id,
						hash: '#results',
					})
				}
			}
		},
	},
}
</script>
