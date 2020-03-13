import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = {
  state: {
    currentUser: null,
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
  },
  actions: {
    setCurrentUser(context, payload) {
      context.commit('setCurrentUser', payload);
    },
  },
  getters: {
    currentUser: (state) => state.currentUser,
  },
  modules: {},
};
export default new Vuex.Store(store);
