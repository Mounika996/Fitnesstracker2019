import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueResource from 'vue-resource';
import VueSocketio from 'vue-socket.io';
import vSelect from 'vue-select';

Vue.use(VueResource);
Vue.component('v-select', vSelect);
Vue.config.productionTip = true;
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';

var data = {
	serverUrl: 'http://192.168.1.22:8080'
}

const config = require('./config');
window.config = config;
Vue.use(new VueSocketio({
	connection: window.config.SERVER_URL
}));

new Vue({
	render: h => h(App),
	router,
	data: data,
	methods: {
		changePerson: function() {
			this.person = {
				first: 'Mounika',
				last: 'kamjula'
			};
		}
	}
}).$mount('#app')
