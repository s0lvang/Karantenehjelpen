import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fb from "./firebaseConfig";
import "@/assets/reset.css";

Vue.config.productionTip = false;

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
