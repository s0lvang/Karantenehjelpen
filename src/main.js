import AsyncComputed from "vue-async-computed";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fb from "./firebaseConfig";
import "@/assets/tailwind.css";

Vue.config.productionTip = false;
Vue.use(AsyncComputed);

let app;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App)
    });
  }
});