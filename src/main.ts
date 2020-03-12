import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import fb from './firebaseConfig';

Vue.config.productionTip = false;

let app: Vue;
fb.auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: (h) => h(App),
    });
  }
});
