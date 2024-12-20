import { createRouter, createWebHistory } from 'vue-router'
import DayPage from '@/pages/DayPage.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import AuthPage from '@/pages/AuthPage.vue'
import WeekPage from '@/pages/WeekPage.vue'

const routes = [
	{
		path: '/day/:date',
		name: 'day',
		component: DayPage,
		props: true
	},
	{
		path: '/week:week',
		name: 'week',
		component: WeekPage
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
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

// Добавляем глобальные хуки для анимации
router.beforeEach((to, from, next) => {
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