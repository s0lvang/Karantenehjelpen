<template>
  <div class="login">
    <h1>Karantenehjelpen</h1>
    <p>
      <b>Hva er Karantenehjelpen?</b>
      <br/>
      Karantenehjelpen hjelper deg med shit bro
    </p>
    <p>
      Login med Google <br>
      <button @click="socialLogin" class="social-button">
        <img alt="Google Logo" src="../assets/google-logo.png">
      </button>
    </p>
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

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
  }
  .social-button {
    width: 75px;
    background: white;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    outline: 0;
    border: 0;
  }
  .social-button:active {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
  .social-button img {
    width: 100%;
  }
</style>
