import { jwtDecode } from 'jwt-decode'

export const authModule = {
	state: {
		token: localStorage.getItem('token') || null,
		user: null,
		isAuth: false,
		PATH: 'http://localhost:3002'
	},
	mutations: {
		setToken(state, token) {
			state.token = token
			if (token) {
				localStorage.setItem('token', token)
				state.user = jwtDecode(token)
				state.isAuth = true
			} else {
				localStorage.removeItem('token')
				state.user = null
				state.isAuth = false
			}
		}
	},
	actions: {
		tryLocalStorage({ commit }) {
			const token = localStorage.getItem('token')
			if (token) {
				commit('setToken', token)
			}
		},
		async fetchRegister({ state, commit }, user) {
			try {
				const response = await fetch(`${state.PATH}/auth/register`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: user.email,
						password: user.password,
						name: user.name,
						dateOfBirth: user.dateOfBirth,
						phone: user.phone
					})
				})

				if (!response.ok) {
					throw new Error(await response.text())
				}

				const data = await response.json()
				if (data.token) {
					commit('setToken', data.token)
				}
				return data
			} catch (error) {
				console.error('Registration error:', error)
				throw error
			}
		},

		async fetchUser({ state, commit }, user) {
			if (!user?.email || !user?.password) {
				throw new Error('Email and password are required')
			}

			try {
				const response = await fetch(`${state.PATH}/auth/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: user.email,
						password: user.password
					})
				})

				if (!response.ok) {
					throw new Error(await response.text())
				}

				const data = await response.json()
				if (data.token) {
					commit('setToken', data.token)
				}
				
				return data
			} catch (error) {
				console.error('Login error:', error)
				throw error
			}
		},

		logout({ commit }) {
			commit('setToken', null)
			localStorage.clear()
		}
	},
	getters: {
		setIsAuth: state => state.isAuth,
		token: state => state.token,
		user: state => state.user
	},
	namespaced: true
}
