<template>
  <div>
    <div>
      <h1>Karantenehjelpen</h1>
      <div>
        <p>Hva er Karantenehjelpen?</p>
        <p>
          Når du sitter i hjemmekarantene skal du ikke oppholde deg på steder
          der man lett kommer nær andre. Da kan det bli veldig vanskelig å få
          handlet inn.
          <br />
          <br />
          Karantenehjelpen skal hjelpe de som sitter i karantene komme i kontakt
          med friske folk som ønsker å hjelpe.
          <br />
          <br />
          Vi trenger både folk som er friske og vil stille opp for sine naboer,
          og tilbyr handlehjelp til de som trenger det mest.
        </p>
        <h3>Følg FHI sine råd!</h3>
        <p>
          Just do it
        </p>
        <p>Logg inn med Google</p>
        <div>
          <a @click="socialLogin">
            <img alt="Google Logo" src="../assets/google-logo.png" />
          </a>
        </div>
      </div>
      <footer id="forBgColor">
        <p>
          Karantenehjelpen@online.ntnu.no
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
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
#forBgColor {
  background-color: rgb(0, 96, 163);
  color: white;
}
</style>
