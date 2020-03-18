<template>
  <button @click="socialLogin()" class="button_style">
    <img alt="Google Logo" src="../assets/google-logo.svg" />
    <span>
      Logg inn med Google
    </span>
  </button>
</template>

<script>
import firebase from "firebase";
import authenticateUser from "@/helpers/authentication";

export default {
  name: "GoogleLoginButton",
  methods: {
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => authenticateUser(this))
        .catch(err => {
          alert(`Oops. ${err.message}`);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  color: rgba(black, 0.5);
  background: white;
  @include elevation-soft;
  border-radius: 4px;
  font-size: inherit;

  font-weight: 600;
  display: flex;
  margin: auto;
  cursor: pointer;
  padding-right: 8px;

  transition: color 0.2s, box-shadow 0.2s;

  &:hover {
    color: rgba(black, 0.75);
    @include elevation-hard;
  }
}
@media #{$desktopAndUp} {
  button {
    padding-right: 1rem;

    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
