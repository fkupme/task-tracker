<template>
	<div class="clock">
		{{ time }}
	</div>
</template>

<script>
export default {
	name: "clock-bar",
	data() {
		return {
			time: "",
		};
	},
	mounted() {
		this.updateTime();
		setInterval(this.updateTime, 1000);
	},
	methods: {
		updateTime() {
			const now = new Date();
			const hours = String(now.getHours()).padStart(2, "0");
			const minutes = String(now.getMinutes()).padStart(2, "0");
			const seconds = String(now.getSeconds()).padStart(2, "0");
			this.time = `${hours}:${minutes}:${seconds}`;
		},
	},
	beforeUnmount() {
		clearInterval(this.interval);
	},
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/globals' as *;

.clock {
	@include font('xl', 'bold', 'mono', 'tight');
	color: $color-nymph-hips;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
