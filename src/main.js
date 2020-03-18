import Vue from "vue";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VuejsDialog from "vuejs-dialog";
import "vuejs-dialog/dist/vuejs-dialog.min.css";

import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import fb from "./firebaseConfig";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VuejsDialog);
Vue.component("v-select", vSelect);

const SENTY_DSN = process.env.VUE_APP_SENTRY_DSN || "";
Sentry.init({
  dsn: SENTY_DSN,
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
});

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
