export default {
	data() {
		return {
			errors: {
				email: '',
				password: '',
				name: '',
				passwordConfirm: '',
				dateOfBirth: '',
				phone: ''
			}
		}
	},
	methods: {
		validateForm(form) {
			let isValid = true
			this.errors = {
				email: '',
				password: '',
				name: '',
				passwordConfirm: '',
				dateOfBirth: '',
				phone: ''
			}

			if (this.isRegister) {
				if (!form.name || form.name.length < 3) {
					this.errors.name = 'Имя должно быть не менее 3 символов'
					isValid = false
				}

				if (!form.phone) {
					this.errors.phone = 'Телефон обязателен для заполнения'
					isValid = false
				}
				else if (!this.validateRegexp(form.phone, /^[0-9]+$/)) {
					this.errors.phone = "Телефон должен содержать только цифры"
					isValid = false
				}
				else if (form.phone.length !== 11) {
					this.errors.phone = "Телефон должен содержать 11 цифр"
					isValid = false
				}
				else if (form.phone[0] !== "8" && form.phone[0] !== "7") {
					this.errors.phone = "Телефон должен начинаться с 8 или 7"
					isValid = false
				}

				if (!form.dateOfBirth) {
					this.errors.dateOfBirth = 'Дата рождения обязательна'
					isValid = false
				}

				if (!form.passwordConfirm || form.password !== form.passwordConfirm) {
					this.errors.passwordConfirm = 'Пароли не совпадают'
					isValid = false
				}
			}

			if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
				this.errors.email = 'Некорректный email'
				isValid = false
			}

			if (!form.password || form.password.length < 8) {
				this.errors.password = 'Пароль должен быть не менее 8 символов'
				isValid = false
			}

			return isValid
		},

		validateRegexp(value, regexp) {
			return regexp.test(value)
		}
	}
} 