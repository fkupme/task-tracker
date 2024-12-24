<template>
	<div class="profile">
		<div class="profile__header">
			<h1 class="profile__title">Личный кабинет</h1>
			<button class="profile__logout" @click="logout">Выйти</button>
		</div>

		<div class="profile__content">
			<div class="profile__info">
				<h2>Персональные данные</h2>
				<div class="profile__field">
					<span class="profile__label">Имя:</span>
					<span class="profile__value">{{ user.name }}</span>
				</div>
				<div class="profile__field">
					<span class="profile__label">Email:</span>
					<span class="profile__value">{{ user.email }}</span>
				</div>
				<div class="profile__field">
					<span class="profile__label">Телефон:</span>
					<span class="profile__value">{{ user.phone }}</span>
				</div>
				<div class="profile__field">
					<span class="profile__label">Дата рождения:</span>
					<span class="profile__value">{{ formatDate(user.dateOfBirth) }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	name: "profile",
	computed: {
		...mapGetters("auth", ["user"]),
	},
	methods: {
		...mapActions("auth", ["logout"]),
		formatDate(date) {
			if (!date) return "";
			return new Date(date).toLocaleDateString("ru-RU");
		},
	},
};
</script>

<style lang="scss" scoped>
.profile {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	&__title {
		font-size: 24px;
		font-weight: bold;
	}

	&__logout {
		padding: 8px 16px;
		background-color: #ff4444;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s;

		&:hover {
			background-color: #cc0000;
		}
	}

	&__content {
		background-color: white;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	&__info {
		h2 {
			font-size: 18px;
			margin-bottom: 20px;
		}
	}

	&__field {
		display: flex;
		margin-bottom: 15px;
		padding: 10px;
		background-color: #f8f9fa;
		border-radius: 4px;
	}

	&__label {
		width: 150px;
		font-weight: 500;
		color: #666;
	}

	&__value {
		flex: 1;
		color: #333;
	}
}
</style>