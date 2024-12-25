import { createRouter, createWebHistory } from 'vue-router'
import DayPage from '@/pages/DayPage.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import AuthPage from '@/pages/AuthPage.vue'
import WeekPage from '@/pages/WeekPage.vue'
import store from '@/store'
import ProfilePage from '@/pages/ProfilePage.vue'


const routes = [
	{
		path: '/day/:weekIndex/:date',
		name: 'day',
		component: DayPage,
		props: true
	},
	{
		path: '/week/:weekIndex',
		name: 'week',
		component: WeekPage,
		props: (route) => ({
			weekIndex: parseInt(route.params.weekIndex, 10)
		})
	},
	{
		path: '/',
		name: 'calendar',
		component: CalendarPage
	},
	{
		path: '/auth',
		name: 'auth',
		component: AuthPage
	},
	{
		path: '/profile',
		name: 'profile',
		component: ProfilePage
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

// Добавляем глобальные хуки для анимации
router.beforeEach((to, from, next) => {
	store.dispatch('auth/tryLocalStorage')
	store.dispatch('events/getEventsFromCache')
	const app = document.getElementById('app')
	if (app) {
		app.classList.add('page-transition-leave')
	}
	next()
})

router.afterEach(() => {
	const app = document.getElementById('app')
	if (app) {
		app.classList.remove('page-transition-leave')
		app.classList.add('page-transition-enter')
		setTimeout(() => {
			app.classList.remove('page-transition-enter')
		}, 300)
	}
})

export default router 