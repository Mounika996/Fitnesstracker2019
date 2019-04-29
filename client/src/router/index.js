import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Userinfo from '@/components/Userinfo';
import Index from '@/components/Index';
import Home from '@/components/Home';
import Friends from '@/components/Friends';
import Exercise from '@/components/Exercise';
import ViewProfile from '@/components/ViewProfile';

Vue.use(Router);

export default new Router({
	routes: [
		{ path: '/', name: 'Index',component: Index},
		{ path: '/Login', name: 'Login',component: Login},
		{ path: '/Register', name: 'Register',component: Register},
		{ path: '/Home', name: 'Home',component: Home},
		{ path: '/Friends', name: 'Friends',component: Friends},
		{ path: '/viewProfile', name: 'ViewProfile',component: ViewProfile},
		{ path: '/Exercise', name: 'Exercise',component: Exercise},
		{ path: '/Userinfo', name: 'Userinfo',component: Userinfo}
	]
})