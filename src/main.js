import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import Vuetify from 'vuetify/lib';
import Axios from 'axios';
import VueMasonry from "vue-masonry-css";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false

Vue.use(Vuetify);
Vue.use(VueMasonry);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBsKurseekHERPXhnmngSSzS0USrRHymk4",
    libraries: "places"
  }
});

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
