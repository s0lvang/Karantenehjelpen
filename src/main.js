import Vue from "vue";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import fb from "./firebaseConfig";
import "@/assets/tailwind.css";

Vue.config.productionTip = false;

Vue.component("v-select", vSelect);

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
