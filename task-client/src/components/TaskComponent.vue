<template>
	<article class="task">
		<h3 class="task__name">{{ task.task }}</h3>
		<div class="task-time">{{ task.start }} - {{ task.end }}</div>
		<div class="task-address"></div>
		<div class="task-modals">
			<div class="task-comment">
				<div
					class="task-comment__text"
					v-if="showComment"
					v-click-outside="closeComment"
				>
					{{ task.comment }}
				</div>
				<button
					class="task-comment__button button"
					@click.stop="toggle('showComment')"
				>
					<img
						class="task-comment__icon"
						src="@/assets/icons/info.svg"
						alt=""
					/>
				</button>
			</div>
			<div class="task-settings">
				<div
					class="task-settings-actions"
					v-if="showSettings"
					v-click-outside="closeSettings"
				>
					<button class="task-settings-actions__button button">
						Редактировать
					</button>
					<button class="task-settings-actions__button button">Удалить</button>
				</div>
				<button
					@click.stop="toggle('showSettings')"
					class="task-settings__button button"
				>
					<img
						class="task-settings__icon"
						src="@/assets/icons/settings-task.svg"
						alt=""
					/>
				</button>
			</div>
		</div>
	</article>
</template>

<script>
import { clickOutside } from "@/directives/clickOutside";

export default {
	data() {
		return {
			showComment: false,
			showSettings: false,
		};
	},
	props: {
		task: Object,
	},
	methods: {
		toggle(model) {
			this[model] = !this[model];
		},
		closeComment() {
			this.showComment = false;
		},
		closeSettings() {
			this.showSettings = false;
		},
	},
	name: "task-component",
	directives: {
		clickOutside,
	},
};
</script>

<style lang='scss' scoped>
@use "@/assets/styles/globals.scss" as *;
.button {
	background: transparent;
	border: none;
}
.task {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 0.5dvh;
	background-color: #faeedd;
	color: $color-deep-violet;
	padding: 2px;
	margin-block: 1dvh;
	&__name {
		text-transform: capitalize;
		word-break: break-word;
		@include font('lg', 'semibold', 'primary');
	}
	&-time {
		text-align: center;
		font-size: 18px;
		font-weight: 600;
		display: inline;
	}
	&-modals {
		display: flex;
		gap: 0.5dvh;
		align-items: center;
		justify-content: space-evenly;
	}
	&-settings {
		position: relative;
		&-actions {
			background-color: $color-deep-violet;
			position: absolute;
			top: 0;
			left: 35px;
			display: flex;
			flex-direction: column;
			gap: 2dvh;
			padding: 2dvh 1dvh;
			z-index: 1000;
			&__button {
				color: $color-nymph-hips;
			}
		}
		&__icon {
			width: 30px;
		}
	}
	&-comment {
		display: flex;
		gap: 0.5dvh;
		align-items: center;
		position: relative;
		&__text {
			position: absolute;
			top: 0;
			left: 35px;
			z-index: 2;
			background-color: $color-deep-violet;
			color: $color-nymph-hips;
			padding: 5px;
			z-index: 1000;
		}
		&__icon {
			width: 30px;
		}
	}
}
</style>