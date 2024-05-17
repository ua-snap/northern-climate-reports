export const number = {
	methods: {
		commas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},
	},
}
