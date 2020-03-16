import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Vuetify from 'vuetify/lib';
import Axios from 'axios';
import VueNumberAnimation from "vue-number-animation";
import VueMasonry from "vue-masonry-css";

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(VueNumberAnimation);
Vue.use(VueMasonry);
Vue.prototype.$http = Axios;

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
