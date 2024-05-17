export const formatting = {
	methods: {
		commas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},
		// https://jslib.dev/wordwrap-for-javascript/
		wordwrap(s, w) {
			return s.replace(
				new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'),
				'$1\n'
			)
		},
	},
}
