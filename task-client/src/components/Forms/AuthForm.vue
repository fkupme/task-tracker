<template>
	<div class="form-wrapper">
		<form class="auth-form" @submit.prevent="handleSubmit" v-if="!isRegister">
			<div class="container">
				<h2 class="auth-form__title">Авторизация</h2>
				<my-field
					v-model="authForm.email"
					label="Email"
					placeholder="Введите email"
					type="email"
					id="email"
					:error="errors.email"
				/>
				<my-field
					v-model="authForm.password"
					label="Пароль"
					placeholder="Введите пароль"
					type="password"
					id="password"
					:error="errors.password"
				/>
				<button class="auth-form__submit" type="submit">Войти</button>
				<div class="auth-form__google">
					<button class="auth-form__google-button">
						<span class="visually-hidden">Войти с помощью Google</span>
						<img src="" alt="Google" />
					</button>
				</div>
				<div class="auth-form__yandex">
					<button class="auth-form__yandex-button">
						<span class="visually-hidden">Войти с помощью Яндекс</span>
						<img src="" alt="Yandex" />
					</button>
				</div>
				<div class="auth-form__vk">
					<button class="auth-form__vk-button">
						<span class="visually-hidden">Войти с помощью ВКонтакте</span>
						<img src="" alt="VK" />
					</button>
				</div>
				<div class="auth-form__to-register-button">
					<button class="auth-form__to-register-button-button" @click="isRegister = true">
						Перейти к регистрации
					</button>
				</div>
			</div>
		</form>
		<form class="register-form" v-else>
			<h2 class="register-form__title">Регистрация</h2>
			<my-field
				v-model="registerForm.name"
				label="Имя"
				placeholder="Введите имя"
				type="text"
				id="name"
				:error="errors.name"
			/>
			<my-field
				v-model="registerForm.login"
				label="Логин"
				placeholder="Введите логин"
				type="text"
				id="login"
				:error="errors.login"
			/>
			<my-field
				v-model="registerForm.email"
				label="Email"
				placeholder="Введите email"
				type="email"
				id="email"
				:error="errors.email"
			/>
			<my-field
				v-model="registerForm.password"
				label="Пароль"
				placeholder="Введите пароль"
				type="password"
				id="password"
				:error="errors.password"
			/>
			<my-field
				v-model="registerForm.passwordConfirm"
				label="Подтвердите пароль"
				placeholder="Введите пароль"
				type="password"
				id="passwordConfirm"
				:error="errors.passwordConfirm"
			/>
			<my-field
				v-model="registerForm.dateOfBirth"
				label="Дата рождения"
				placeholder="Введите дату рождения"
				type="date"
				id="dateOfBirth"
				:error="errors.dateOfBirth"
			/>
			<button class="register-form__submit" type="submit">Зарегистрироваться</button>
			<div class="register-form__to-auth-button">
				<button class="register-form__to-auth-button-button" @click="isRegister = false">
					Перейти к авторизации
				</button>
			</div> 
		</form>
	</div>
</template>

<script>
import MyField from '../UI/MyField.vue';
export default {
	components: { MyField },
	name: "auth-form",
	data() {
		return {
			isRegister: false,
			authForm: {
				email: "",
				password: "",
			},
			registerForm: {
				name: "",
				login: "",
				email: "",
				password: "",
				passwordConfirm: "",
				dateOfBirth: "",
			},
			errors: {
				email: "",
				password: "",
				name: "",
				login: "",
				passwordConfirm: "",
				dateOfBirth: "",
			},
		};
	},
	methods: {
		handleSubmit() {
			// Валидация и отправка формы
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;

.auth-form {
	width: 100%;
	max-width: 400px;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 2rem;
	background-color: $color-nymph-hips;
	border-radius: 8px;

	&__title {
		@include font("xl", "bold", "primary");
		text-align: center;
		color: $color-deep-violet;
	}

	&__submit {
		@include font("base", "medium", "primary");
		padding: 0.5rem;
		background-color: $color-deep-violet;
		color: $color-nymph-hips;
		border: none;
		border-radius: 4px;
	}
}
</style> 