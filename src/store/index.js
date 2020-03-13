import Vue from 'vue';
import Vuex from 'vuex';
import fb from '../firebaseConfig';

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
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then((res) => {
          commit('setUserProfile', res.data());
        })
        .catch((err) => {
          console.log(err);
        });
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
  modules: {},
};
export default new Vuex.Store(store);
