import Vue from 'vue';
import Vuex from 'vuex';
import fb from '@/firebaseConfig.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    address: '',
    arrivalDescription: '',
    phoneNumber: '',
    paymentSolution: '',
    items: [],
    requests: [],
  },
  getters: {
    currentUser: (state) => state.currentUser,
    name: (state) => (state.currentUser ? state.currentUser.displayName : null),
    email: (state) => (state.currentUser ? state.currentUser.email : null),
    id: (state) => (state.currentUser ? state.currentUser.uid : null),
    address: (state) => state.address,
    phoneNumber: (state) => state.phoneNumber,
    arrivalDescription: (state) => state.arrivalDescription,
    paymentSolution: (state) => state.paymentSolution,
    items: (state) => state.items,
    requests: (state) => state.requests,
  },
  mutations: {
    SET_CURRENT_USER(state, val) {
      state.currentUser = val;
    },
    SET_ADDRESS(state, payload) {
      state.address = payload;
    },
    SET_PHONE_NUMBER(state, payload) {
      state.phoneNumber = payload;
    },
    SET_ARRIVAL_DESCRIPTION(state, payload) {
      state.arrivalDescription = payload;
    },
    SET_ITEMS(state, payload) {
      state.items = payload;
    },
    SET_REQUESTS(state, payload) {
      state.requests = payload;
    },
    SET_PAYMENT_SOLUTION(state, payload) {
      state.paymentSolution = payload;
    },
  },
  actions: {
    SET_CURRENT_USER: (context, payload) => {
      context.commit('SET_CURRENT_USER', payload);
    },
    SET_ADDRESS: (context, payload) => {
      context.commit('SET_ADDRESS', payload);
    },
    SET_PHONE_NUMBER: (context, payload) => {
      context.commit('SET_PHONE_NUMBER', payload);
    },
    SET_ARRIVAL_DESCRIPTION: (context, payload) => {
      context.commit('SET_ARRIVAL_DESCRIPTION', payload);
    },
    SET_ITEMS: (context, payload) => {
      context.commit('SET_ITEMS', payload);
    },
    SET_REQUESTS: (context, payload) => {
      context.commit('SET_REQUESTS', payload);
    },
    SET_PAYMENT_SOLUTION: (context, payload) => {
      context.commit('SET_PAYMENT_SOLUTION', payload);
    },
  },
});
//
fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('SET_CURRENT_USER', user);
    fb.requestsCollection.orderBy('createdOn', 'desc').onSnapshot((querySnapshot) => {
      const requests = querySnapshot.docs.map((request) => ({ ...request.data(), id: request.id }));
      store.commit('SET_REQUESTS', requests);
    });
  }
});


export default store;
