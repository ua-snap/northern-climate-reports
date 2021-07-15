<template>
	<div class="place-selector--wrapper">
		<h4 class="title is-5">Find a place</h4>
		<b-field label="Find a community by name">
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
			</b-autocomplete>
		</b-field>
	</div>
</template>
<style>
.place-selector--wrapper * {
	z-index: 10000;
}
</style>
<script>
import { mapMutations } from 'vuex'
import places from '~/assets/places'

// So it's not decorated with reactive stuff by Vue,
// we don't want that.
Object.freeze(places)

export default {
	name: 'PlaceSelector',
	data() {
		return {
			places: places,
			selected: undefined,
			selectedPlace: ''
		}
	},
	methods: {
		...mapMutations(['setPlaceId']),
	},
	computed: {
        filteredDataObj() {
            return this.places.filter(option => {
                return (
                    option.name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.selectedPlace.toLowerCase()) >= 0
                )
            })
        }
    },
    watch: {
    	selected: function (selected) {
    		if(selected) {
	    		this.setPlaceId(selected.id)
	    	}
    	}
    }
}
</script>
