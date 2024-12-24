<template>
	<div class="form-wrapper" v-if="!isAuth">
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
				<div class="auth-form__swap">
					<button
						class="auth-form__swap-button"
						@click.prevent="isRegister = true"
					>
						Перейти к регистрации
					</button>
				</div>
				<div class="auth-form-panel">
					<div class="auth-form-passport">
						<button class="auth-form-passport-button">
							<span class="visually-hidden">Войти с помощью Google</span>
							<img
								class="auth-form-passport-button-icon"
								src="@/assets/icons/google.svg"
								alt="Google"
							/>
						</button>
					</div>
					<div class="auth-form-passport">
						<button class="auth-form-passport-button">
							<span class="visually-hidden">Войти с помощью Яндекс</span>
							<img
								class="auth-form-passport-button-icon"
								src="@/assets/icons/yandex.svg"
								alt="Yandex"
							/>
						</button>
					</div>
					<div class="auth-form-passport">
						<button class="auth-form-passport-button">
							<span class="visually-hidden">Войти с помощью ВКонтакте</span>
							<img
								class="auth-form-passport-button-icon"
								src="@/assets/icons/vk.svg"
								alt="VK"
							/>
						</button>
					</div>
				</div>
			</div>
		</form>
		<form class="auth-form" @submit.prevent="handleSubmit" v-else>
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
				v-model="registerForm.email"
				label="Email"
				placeholder="Введите email"
				type="email"
				id="email"
				:error="errors.email"
			/>
			<my-field
				v-model="registerForm.phone"
				label="Телефон"
				placeholder="+7 (999) 999-99-99"
				type="tel"
				id="phone"
				:error="errors.phone"
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
			<button class="auth-form__submit" @click="phoneParser(registerForm.phone)" type="submit">
				Зарегистрироваться
			</button>
			<div class="auth-form__swap">
				<button
					class="auth-form__swap-button"
					@click.prevent="isRegister = false"
				>
					Перейти к авторизации
				</button>
			</div>
		</form>
	</div>
	<div v-else>
		<h2>Вы уже авторизованы</h2>
		<button @click="logout">Выйти</button>
		<my-message text="Вы уже авторизованы" visible="true" type="info" />
	</div>
</template>

<script>
import MyField from "@/components/UI/MyField.vue";
import MyMessage from "@/components/UI/MyMessage.vue";
import validation from "@/mixins/validation";
import { mapActions, mapState } from "vuex";

export default {
	mixins: [validation],
	components: { MyField, MyMessage },
	name: "auth-form",
	data() {
		return {
			isRegister: false,
			authForm: {
				email: "",
				password: "",
				name: "",
				passwordConfirm: "",
				dateOfBirth: "",
				phone: "",
			},
			registerForm: {
				name: "",
				email: "",
				password: "",
				passwordConfirm: "",
				dateOfBirth: "",
				phone: "",
			},
			errors: {
				email: "",
				password: "",
				name: "",
				login: "",
				passwordConfirm: "",
				dateOfBirth: "",
				phone: "",
			},
		};
	},
	methods: {
		phoneParser(phone) {
			if (!this.isRegister) {
				return;
			}
			if(phone[0] === '8' || phone[0] === '7') {
				this.registerForm.phone = phone;
			}else if(phone[0] === '9') {
				this.registerForm.phone = `7${phone}`;
			}else if(phone[0] === '+') {
				this.registerForm.phone = phone.slice(1);
			}
		},
		...mapActions({
			fetchUser: "auth/fetchUser",
			fetchRegister: "auth/fetchRegister",
		}),
		async handleSubmit() {
			const formData = this.isRegister ? this.registerForm : this.authForm;
			if (!this.validateForm(formData)) {
				return;
			}

			try {
				if (this.isRegister) {
					await this.fetchRegister({ ...this.registerForm });
				} else {
					await this.fetchUser({ ...this.authForm });
				}
				this.$router.push("/profile");
			} catch (error) {
				console.error("Auth error:", error);
			}
		},
	},
	computed: {
		...mapState({
			isAuth: (state) => state.auth.isAuth,
		}),
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
		margin-block: 1rem;
	}
	&-panel {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin-block: 1rem;
		.auth-form-passport {
			&-button {
				background-color: transparent;
				border: none;
				border-radius: 4px;
				&-icon {
					width: 2rem;
					height: 2rem;
				}
			}
		}
	}
	&__swap {
		&-button {
			@include font("base", "medium", "primary");
			color: $color-deep-violet;
			background-color: $color-nymph-hips;
			border: none;
			border-radius: 4px;
		}
	}
}
</style> 