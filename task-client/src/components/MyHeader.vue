<template>
	<div class="container">
		<header class="header">
			<div class="header__logo" @click="$router.push('/')">Task Creator</div>
			<date-time-widget/>
			<div class="header-settings">
				<img src="@/assets/icons/settings-cog-svgrepo-com.svg" alt="" />
			</div>
		</header>
	</div>
</template>

<script>
import DateTimeWidget from "@/components/Widgets/DateTimeWidget.vue";

export default {
	name: "my-header",
	components: { DateTimeWidget },
};
</script>

<style lang='scss' scoped>
@use '@/assets/styles/globals' as *;
	
.header {
	position: relative;
	padding-top: 10px;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	&__logo {
		@include font('2xl', 'bold', 'secondary', 'tight');
		color: $color-indigo;
		text-shadow: 3px 2px 3px rgba(255, 255, 255, 0.2);
		cursor: pointer;
	}

	&-settings {
		position: fixed;
		right: 20px;
		bottom: 20px;
		
		& > img {
			width: 50px;
		}
	}
}
</style>
