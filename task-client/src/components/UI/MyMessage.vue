<template>
	<transition name="message">
		<div v-if="isVisible && visible" :class="['message', type]">
			<div class="message__content">
				<span class="message__text">{{ text }}</span>
				<button v-if="closeable" class="message__close" @click="close">
					<span class="visually-hidden">Закрыть сообщение</span>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 4L4 12"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						/>
						<path
							d="M4 4L12 12"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
				</button>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: "my-message",
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		text: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: "info",
			validator: (value) =>
				["info", "success", "warning", "error"].includes(value),
		},
		duration: {
			type: Number,
			default: 3000,
		},
		closeable: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			isVisible: true,
			timer: null,
		};
	},
	watch: {
		visible(newVal) {
			if (newVal) {
				this.isVisible = true;
				this.startTimer();
			}
		},
	},
	mounted() {
		if (this.visible && this.duration > 0) {
			this.startTimer();
		}
	},
	beforeUnmount() {
		this.clearTimer();
	},
	methods: {
		startTimer() {
			this.clearTimer();
			if (this.duration > 0) {
				this.timer = setTimeout(() => {
					this.close();
				}, this.duration);
			}
		},
		clearTimer() {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
		},
		close() {
			this.isVisible = false;
			this.clearTimer();
			this.$emit("close");
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;

.message {
	position: fixed;
	top: 1rem;
	right: 1rem;
	z-index: 1000;
	max-width: 400px;
	padding: 1rem;
	border-radius: 8px;
	background-color: $color-nymph-hips;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	&__content {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	&__text {
		@include font("base", "medium", "primary");
		flex-grow: 1;
	}

	&__close {
		background: none;
		border: none;
		padding: 0.25rem;
		cursor: pointer;
		color: inherit;
		opacity: 0.7;
		transition: opacity 0.2s;

		&:hover {
			opacity: 1;
		}
	}

	// Типы сообщений
	&.info {
		background-color: $color-nymph-hips;
		color: $color-deep-violet;
	}

	&.success {
		background-color: #d4edda;
		color: #155724;
	}

	&.warning {
		background-color: #fff3cd;
		color: #856404;
	}

	&.error {
		background-color: #f8d7da;
		color: #721c24;
	}
}

// Анимации
.message-enter-active,
.message-leave-active {
	transition: all 0.3s ease;
}

.message-enter-from,
.message-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.visually-hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
</style> 