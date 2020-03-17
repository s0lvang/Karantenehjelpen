<template>
  <div class="btnDiv">
    <button @click="socialLogin()" class="button_style">
      <img alt="Google Logo" src="../assets/google-logo.svg" />
      <span id="btnText">
        Logg inn med google
      </span>
    </button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "LoginButton",
  methods: {
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          const { currentUser } = firebase.auth();
          this.$store.dispatch("SET_CURRENT_USER", currentUser);
          this.$router.replace("home");
        })
        .catch(err => {
          alert(`Oops. ${err.message}`);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.btnDiv {
  display: flex;
  justify-content: space-around;
  -moz-box-align: center;
  align-items: center;
  margin: 2rem 0px;
}
.button_style {
  background-color: rgb(0, 96, 163);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  margin: auto;
  cursor: pointer;
  &:hover {
    background-color: rgb(3, 141, 240);
  }

  #btnText {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
  }
}
</style>
