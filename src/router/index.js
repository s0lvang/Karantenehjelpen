import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import AllRequests from '@/views/AllRequests.vue';
import CreateRequestView from '@/views/CreateRequestView.vue';
import StartScreenView from '@/views/StartScreenView.vue';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: 'start-screen',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/start-screen',
    name: 'StartScreen',
    component: StartScreenView,
  },
  {
    path: '/all-requests',
    name: 'AllRequests',
    component: AllRequests,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/create-request',
    name: 'CreateRequest',
    component: CreateRequestView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const { currentUser } = firebase.auth();

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
