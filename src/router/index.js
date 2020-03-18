import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import AllRequests from "@/views/AllRequests.vue";
import CreateRequestView from "@/views/CreateRequestView.vue";
import StartScreenView from "@/views/StartScreenView.vue";
import RequestView from "@/views/RequestView.vue"; // eslint-disable
import MyRequestsView from "@/views/MyRequestsView.vue"; // eslint-disable
import MyAssignedRequestsView from "@/views/MyAssignedRequestsView.vue"; // eslint-disable
import EditRequestView from "@/views/EditRequestView.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "start-screen"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/start-screen",
    name: "StartScreen",
    component: StartScreenView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/all-requests",
    name: "AllRequests",
    component: AllRequests,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/create-request",
    name: "CreateRequest",
    component: CreateRequestView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/my-assigned-requests",
    name: "MyAssignedRequests",
    component: MyAssignedRequestsView,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/my-requests",
    name: "MyRequests",
    component: MyRequestsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/request/:id",
    name: "Request",
    component: RequestView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/edit/:id",
    name: "EditRequest",
    component: EditRequestView,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const { currentUser } = firebase.auth();
  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
