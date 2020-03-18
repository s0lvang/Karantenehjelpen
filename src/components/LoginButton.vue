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
import fb from "@/firebaseConfig.js";

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
          fb.additionalUserInfoCollection
            .doc(currentUser.uid)
            .get()
            .then(userInfo => {
              if (userInfo.data() && userInfo.data().phoneNumber) {
                this.$store.dispatch("SET_CURRENT_USER", {
                  ...currentUser,
                  ...userInfo.data()
                });
                this.$router.replace("home");
              } else {
                this.$dialog
                  .prompt({
                    title: "Telefonnummer",
                    body: "Skriv inn telefonnummeret ditt uten landskode",
                    promptHelp: ""
                  })
                  .then(dialog => {
                    fb.additionalUserInfoCollection
                      .doc(currentUser.uid)
                      .set({ phoneNumber: dialog.data });
                    this.$store.dispatch("SET_CURRENT_USER", {
                      ...currentUser,
                      phoneNumber: dialog.data
                    });
                    this.$router.replace("home");
                  })
                  .catch(() => {
                    firebase
                      .auth()
                      .signOut()
                      .then(() => {
                        this.$store.dispatch("SET_CURRENT_USER", null);
                      })
                      .catch(error => {
                        console.log(`something went wrong ${error.message}`);
                      });
                  });
              }
            });
        })
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
