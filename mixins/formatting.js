export const formatting = {
	methods: {
		commas(x) {
			try {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			} catch (e) {
				throw new Error(
					'undefined value or unexpected type provided to `mixins/formatting/commas`'
				)
			}
		},
		wordwrap(s, w) {
			try {
				return s.replace(
					new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'),
					'$1\n'
				)
			} catch (e) {
				throw new Error(
					'undefined value or unexpected type provided to `mixins/formatting/wordwrap`'
				)
			}
		},
	},
}
