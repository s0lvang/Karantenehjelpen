import Vue from "vue";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VuejsDialog from "vuejs-dialog";
import "vuejs-dialog/dist/vuejs-dialog.min.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import fb from "./firebaseConfig";

Vue.config.productionTip = false;

Vue.use(VuejsDialog);
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
