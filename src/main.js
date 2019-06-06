// IMPORTS
// --- "Back-End" ---
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './routes';

import moment from "moment";

// --- "Front-End" ---
import App from './App.vue';

// ~ BootstrapVue ~
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// ~ Multi Select ~
import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

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
