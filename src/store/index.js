import Vue from 'vue';
import Vuex from 'vuex';
import fb from '../firebaseConfig';

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
  },
  modules: {},
};
export default new Vuex.Store(store);
