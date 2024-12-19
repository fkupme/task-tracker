import { createRouter, createWebHistory } from 'vue-router'
import DayPage from '@/pages/DayPage.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import AuthPage from '@/pages/AuthPage.vue'

const routes = [
	{
		path: '/day/:date',
		name: 'day',
		component: DayPage,
		props: true
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

export default router 