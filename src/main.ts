import Vue from 'vue';
import App from './App.vue';

require('./assets/main.scss');

Vue.config.productionTip = false;

new Vue({
  data: {
    version: 0.1,
  },
  render: (h) => h(App),
}).$mount('#app');
