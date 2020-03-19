<template>
  <button @click="signInWithGoogle()" class="button_style">
    <img alt="Google Logo" src="../assets/google-logo.svg" />
    <span>
      Logg inn med Google
    </span>
  </button>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "LoginButton",
  methods: {
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  color: white;
  background: #4286f5;
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
    @include elevation-hard;
  }

  img {
    background: white;
    margin-right: 1rem;
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
