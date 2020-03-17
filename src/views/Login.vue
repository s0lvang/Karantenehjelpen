<template>
  <section>
    <h1>Karantenehjelpen</h1>
    <strong>Hva er Karantenehjelpen?</strong>
    <p>
      Når du sitter i hjemmekarantene skal du ikke oppholde deg på steder der
      man lett kommer nær andre. Da kan det bli veldig vanskelig å få handlet
      inn.
    </p>
    <p>
      Karantenehjelpen skal hjelpe de som sitter i karantene komme i kontakt med
      friske folk som ønsker å hjelpe.
    </p>
    <p>
      Vi trenger både folk som er friske og vil stille opp for sine naboer, og
      tilbyr handlehjelp til de som trenger det mest.
    </p>
    <strong>Følg FHI sine råd!</strong>
    <p>
      Just do it
    </p>
    <Button btnText="Logg inn med Google" @btnClicked="socialLogin" />
  </section>
</template>

<script>
import firebase from "firebase";

import Button from "@/components/shared/Button.vue";

export default {
  name: "login",
  components: {
    Button
  },
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
h1 {
  margin-top: 4rem;
  text-align: center;
}
</style>
