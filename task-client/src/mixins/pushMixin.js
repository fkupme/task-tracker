export default {
	methods: {
		push(name, params = {}, delay = 300) {
			if ('weekIndex' in params) {
				params.weekIndex = Number(params.weekIndex)
			}
			setTimeout(() => {
				this.$router.push({
					name: name,
					params: params,
				})
			}, delay)
		},
	},
}