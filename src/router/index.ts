import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import AllRequests from '@/views/AllRequests.vue';
import CreateRequestView from '@/views/CreateRequestView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/all-requests',
    name: 'AllRequests',
    component: AllRequests,
  },
  {
    path: '/create-request',
    name: 'CreateRequest',
    component: CreateRequestView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
