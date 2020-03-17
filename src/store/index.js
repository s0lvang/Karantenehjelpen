import Vue from "vue";
import Vuex from "vuex";
import fb from "@/firebaseConfig.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    address: {},
    arrivalDescription: "",
    phoneNumberInput: "",
    paymentSolution: "",
    items: [],
    requests: [],
    geolocation: {},
    showDistance: false
  },
  getters: {
    currentUser: state => state.currentUser,
    name: state => (state.currentUser ? state.currentUser.displayName : null),
    email: state => (state.currentUser ? state.currentUser.email : null),
    phoneNumber: state =>
      state.currentUser ? state.currentUser.phoneNumber : null,
    id: state => (state.currentUser ? state.currentUser.uid : null),
    address: state => state.address,
    phoneNumberInput: state => state.phoneNumberInput,
    arrivalDescription: state => state.arrivalDescription,
    paymentSolution: state => state.paymentSolution,
    items: state => state.items,
    requests: state => state.requests,
    location: state => state.geolocation,
    showDistance: state => state.showDistance
  },
  mutations: {
    SET_CURRENT_USER(state, val) {
      state.currentUser = val;
    },
    SET_ADDRESS(state, payload) {
      state.address = payload;
    },
    SET_PHONE_NUMBER_INPUT(state, payload) {
      state.phoneNumberInput = payload;
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
    SET_GEOLOCATION(state, payload) {
      state.geolocation = payload;
    },
    SET_SHOW_DISTANCE(state, payload) {
      state.showDistance = payload;
    }
  },
  actions: {
    SET_CURRENT_USER: (context, payload) => {
      context.commit("SET_CURRENT_USER", payload);
    },
    SET_ADDRESS: (context, payload) => {
      context.commit("SET_ADDRESS", payload);
    },
    SET_PHONE_NUMBER_INPUT: (context, payload) => {
      context.commit("SET_PHONE_NUMBER_INPUT", payload);
    },
    SET_ARRIVAL_DESCRIPTION: (context, payload) => {
      context.commit("SET_ARRIVAL_DESCRIPTION", payload);
    },
    SET_ITEMS: (context, payload) => {
      context.commit("SET_ITEMS", payload);
    },
    SET_REQUESTS: (context, payload) => {
      context.commit("SET_REQUESTS", payload);
    },
    SET_PAYMENT_SOLUTION: (context, payload) => {
      context.commit("SET_PAYMENT_SOLUTION", payload);
    },
    SET_GEOLOCATION: (context, payload) => {
      context.commit("SET_GEOLOCATION", payload);
    },
    SET_SHOW_DISTANCE: (context, payload) => {
      context.commit("SET_SHOW_DISTANCE", payload);
    }
  }
});

// Firebase auth state change
fb.auth.onAuthStateChanged(user => {
  if (user) {
    fb.additionalUserInfoCollection
      .doc(user.uid)
      .get()
      .then(userInfo => {
        console.log(userInfo.data());
        store.commit("SET_CURRENT_USER", { ...user, ...userInfo.data() });
      })
      .catch(() =>
        console.log("noe gikk galt da vi skulle hente brukerinfoen din")
      );
    fb.db
      .collectionGroup("requests")
      .orderBy("createdOn", "desc")
      .onSnapshot(querySnapshot => {
        const requests = querySnapshot.docs.map(request => ({
          ...request.data(),
          id: request.id
        }));
        store.commit("SET_REQUESTS", requests);
      });
  }
});

/**
 * GEOLOCATION
 * ===========
 *
 * Firstly, this will prompt the user for permissions to retrieve geolocation.
 * We want to retrieve a high accuracy position, and it can be a maximum of a
 * minute old (cache might return cached pos). We also want to time out after 5
 * seconds as browser geolocation APIs are quite buggy, and sometimes will just
 * _die_.
 *
 * The fallback address is actually my home address, so if people aren't cool
 * enough to enable geolocation, they'll be inclined to deliver to me first.
 *
 * EDIT: Turns out that the rest of the team didn't appreciate my humor, so I'm setting
 * the default to Trondheim city.
 *
 * This should probably be changed to something better for humanity, but it'll
 * do for now.
 */
navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    store.commit("SET_GEOLOCATION", { latitude, longitude });
    store.commit("SET_SHOW_DISTANCE", true);
  },
  err => {
    console.error(
      `Could not retrieve geolocation. ${err.code}: ${err.message}.`
    );
    store.commit("SET_GEOLOCATION", {
      latitude: 63.41002,
      longitude: 10.395053
    });
    store.commit("SET_SHOW_DISTANCE", false);
  },
  { enableHighAccuracy: true, maximumAge: 60000, timeout: 5000 }
);

export default store;
