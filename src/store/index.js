import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const store = {
  state: {
    currentUser: null,
    address: '',
    arrivalDescription: '',
    phoneNumber: '',
    items: [],
  },
  getters: {
    currentUser: (state) => state.currentUser,
    address: (state) => state.address,
    phoneNumber: (state) => state.phoneNumber,
    arrivalDescription: (state) => state.arrivalDescription,
    items: (state) => state.items,
  },
  mutations: {
    setCurrentUser(state, val) {
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
  },
  actions: {
    setCurrentUser: (context, payload) => {
      context.commit('setCurrentUser', payload);
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
  },
};
export default new Vuex.Store(store);
