export default {
	methods: {
			push(name, params, timeout) {
					setTimeout(() => {
							this.$router.push({ name: name, params: params });
					}, timeout);
			}
	}
}