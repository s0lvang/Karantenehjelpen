<template>
  <div class="container mx-auto">
    <div class="flex flex-col items-center">
      <p class="text-center">Logg inn med Google</p>
      <a @click="socialLogin" class="align-middle">
        <img alt="Google Logo" src="../assets/google-logo.png" class="h-24">
      </a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'login',
  methods: {
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(() => {
        const { currentUser } = firebase.auth();
        this.$store.dispatch('SET_CURRENT_USER', currentUser);
        this.$router.replace('home');
      }).catch((err) => {
        alert(`Oops. ${err.message}`);
      });
    },
  },
};
</script>
