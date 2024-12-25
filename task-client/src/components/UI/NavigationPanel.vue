<template>
	<div class="navigation-panel">
			<button class="navigation-panel__button" @click="$emit('prev')">
					<img
							class="navigation-panel__button-icon"
							src="@/assets/icons/arrow-back.svg"
							alt="back"
					/>
			</button>
			<button class="navigation-panel__button" @click="$emit('next')">
					<img
							class="navigation-panel__button-icon"
							src="@/assets/icons/arrow-forward.svg"
							alt="forward"
					/>
			</button>
	</div>
</template>

<script>
export default {
	name: 'navigation-panel',
	emits: ['prev', 'next']
}
</script>

<style lang="scss" scoped>
.navigation-panel {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;

	&__button {
			background: none;
			border: none;
			padding: 0;
			margin: 0;
			transition: transform 0.2s ease;

			&:active {
					transform: scale(0.95);
			}

			&-icon {
					width: 34px;
					height: 34px;
			}
	}
}
</style>