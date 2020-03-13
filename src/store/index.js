import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = {
  state: {
    currentUser: null,
    address: '',
    arrivalDescription: '',
    items: [],
  },
  getters: {
    address: (state) => state.address,
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
    SET_ARRIVAL_DESCRIPTION(state, payload) {
      state.arrivalDescription = payload;
    },
    SET_ITEMS(state, payload) {
      state.items = payload;
    },
  },
  actions: {
    setCurrentUser(context, payload) {
      context.commit('setCurrentUser', payload);
    },
    SET_ADDRESS: (context, payload) => {
      context.commit('SET_ADDRESS', payload);
    },
    SET_ARRIVAL_DESCRIPTION: (context, payload) => {
      context.commit('SET_ARRIVAL_DESCRIPTION', payload);
    },
    SET_ITEMS: (context, payload) => {
      context.commit('SET_ITEMS', payload);
    },
  },
  getters: {
    currentUser: (state) => state.currentUser,
  },
  modules: {},
};
export default new Vuex.Store(store);
