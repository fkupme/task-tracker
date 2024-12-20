<template>
	<div id="app">
		<my-header />
		<router-view />
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

#app {
	position: relative;
	overflow-x: hidden;
}
</style>
