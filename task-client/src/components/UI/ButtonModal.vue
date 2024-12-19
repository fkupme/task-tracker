<template>
	<div class="button-modal">
		<div 
			v-if="show" 
			class="button-modal__content"
			v-click-outside="close"
		>
			<slot name="content"/>
		</div>
		<button 
			class="button-modal__trigger"
			@click.stop="$emit('toggle')"
		>
			<img
				:src="require(`@/assets/icons/${icon}`)"
				:alt="icon"
				class="button-modal__icon"
			/>
		</button>
	</div>
</template>

<script>
import { clickOutside } from '@/directives/clickOutside'

export default {
	name: 'button-modal',
	props: {
		show: Boolean,
		icon: String
	},
	directives: {
		clickOutside
	},
	emits: ['toggle', 'close'],
	methods: {
		close() {
			this.$emit('close')
		}
	}
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals.scss" as *;

.button-modal {
	position: relative;

	&__content {
		position: absolute;
		top: 0;
		left: 35px;
		background-color: $color-deep-violet;
		color: $color-nymph-hips;
		padding: 0.5rem;
		z-index: 1000;
		min-width: 120px;
		border-radius: 4px;
	}

	&__trigger {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
	}

	&__icon {
		width: 30px;
		height: 30px;
	}
}
</style> 