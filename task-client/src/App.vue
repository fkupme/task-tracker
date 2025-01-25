<template>
	<div id="app">
		<my-header />	
		<router-view />
		<footer class="footer">
			<p class="footer__text">с наилучшими <br> пожеланиями</p>
		</footer>
	</div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";

export default {
	name: "App",
	components: { MyHeader },
};
</script>

<style lang="scss">
@use '@/assets/styles/globals' as *;
@use '@/assets/styles/transitions' as *;
@use 'sass:color';
#app {
	position: relative;
	overflow-x: hidden;
	
}
.footer {
	bottom: 0;
	width: 100%;
	text-align: center;
	padding-block: 3dvh;
}
.footer__text {
	@include font("xl", "regular", "primary");
	color: color.adjust($color-deep-violet, $alpha: -0.4);
}
</style>
