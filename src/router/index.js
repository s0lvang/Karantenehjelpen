import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

const Login = () => import(/* webpackChunkName: "main" */ "@/views/Login.vue");
const AllRequests = () =>
  import(/* webpackChunkName: "requests" */ "@/views/AllRequests.vue");
const CreateRequestView = () =>
  import(/* webpackChunkName: "requests" */ "@/views/CreateRequestView.vue");
const StartScreenView = () =>
  import(/* webpackChunkName: "requests" */ "@/views/StartScreenView.vue");
const RequestView = () =>
  import(/* webpackChunkName: "requests" */ "@/views/RequestView.vue");
const MyRequestsView = () =>
  import(/* webpackChunkName: "requests" */ "@/views/MyRequestsView.vue");
const MyAssignedRequestsView = () =>
  import(
    /* webpackChunkName: "requests" */ "@/views/MyAssignedRequestsView.vue"
  );
const EditRequestView = () =>
  import(/* webpackChunkName: "requests" */ "@/views/EditRequestView.vue");
const MyPageView = () =>
  import(/* webpackChunkName: "profile" */ "@/views/MyPageView.vue");

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
  },
  {
    path: "/my-page",
    name: "MyPage",
    component: MyPageView,
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
