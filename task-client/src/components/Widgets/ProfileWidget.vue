<template>
	<div class="profile-widget">
		<img
			class="profile-widget__icon"
			:src="iconSource"
			:alt="isAuth ? 'профиль' : 'войти'"
			@click="handleClick"
		/>
	</div>
</template>

<script>
import loginIcon from "@/assets/icons/not-auth.svg";
import profileIcon from "@/assets/icons/auth.svg";

export default {
	name: "profile-widget",
	data() {
		return {
			isAuth: false,
		};
	},
	computed: {
		// ...mapState({
		// 	isAuth: (state) => state.auth.isAuth,
		// }),
		iconSource() {
			return this.isAuth ? profileIcon : loginIcon;
		},
	},
	methods: {
		handleClick() {
			if (this.isAuth) {
				this.$router.push("/profile");
			} else {
				this.$router.push("/auth");
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;

.profile-widget {
	display: flex;
	align-items: center;
	justify-content: flex-end;

	&__icon {
		width: 50px;
		transition: transform .2s ease;


		&:active {
			transform: scale(1.25);
		}
	}
}
</style> 