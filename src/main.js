// IMPORTS
// --- "Back-End" ---
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './routes';

import moment from "moment";

// --- "Front-End" ---
import App from './App.vue';

// ~ Font Awesome ~
import { library } from '@fortawesome/fontawesome-svg-core';	// Font Awesome core
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';	// Font Awesome component

// Import selected icons
//import { iconName } from '@fortawesome/free-solid-svg-icons'; // Solid style icons
//import { iconName } from '@fortawesome/free-regular-svg-icons'; // Regular style icons
//import { iconName } from '@fortawesome/free-brands-svg-icons'; // Brands icons

// Add the imported icons to use them
//library.add(iconName);

// Font Awesome component
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Vuesax
import Vuesax from 'vuesax'; // Vuesax framework
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
	theme:{
		colors:{
			primary:'#0067F4',
			secondary: '#5A6169',
			success:'#17C671',
			info: '#00B8D8',
			warning:'#FFB400',
			danger:'#C4183C',
			light: '#E9ECEF',
			dark:'#212529'
		}
	}
});


// TODO: consider the necessity of this
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import 'material-icons/iconfont/material-icons.css';

// Router
const router = new VueRouter({ routes, mode: 'history'});

// USES
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuetify, { iconfont: 'mdi' });

// FILTERS
Vue.filter('formatDate', function(value) {
  if (value)
    return moment(String(value)).format('DD/MM/YYYY hh:mm:ss');
});

// CONFIGS
Vue.config.productionTip = false;

// START
new Vue({
  router: router,
  render: r => r(App),
  renderError(r, error) {
    return r('ERROR', {
      style: {
        color: 'red'
      }
    }, error.stack)
  },
}).$mount('#app');
