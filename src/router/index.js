import {createRouter, createWebHistory} from 'vue-router'
import store from '../store/index'

const routes = [

	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue'),
		meta: {
			layout: 'main',
			auth: true,
		}
	},
	{
		path: '/help',
		name: 'help',
		component: () => import('../views/Help.vue'),
		meta: {
			layout: 'main',
			auth: true,
		}
	},
	{
		path: '/request/:id',
		name: 'request',
		component: () => import('../views/Request.vue'),
		meta: {
			layout: 'main',
			auth: true,
		}
	},
	{
		path: '/auth',
		name: 'auth',
		component: () => import('../views/Auth.vue'),
		meta: {
			layout: 'auth',
			auth: false,
		}
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	linkExactActiveClass: "active",
	linkActiveClass: "active",
})

router.beforeEach((to, from, next) => {
	const needAuth = to.meta.auth;
	const isAuth = store.getters["authModule/isAuth"];

	if (needAuth && isAuth) {
		next();
	} else if (needAuth && !isAuth) {
		next('/auth?msg=auth');
	} else {
		next();
	}
});

export default router;
