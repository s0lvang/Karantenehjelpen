<template>
  <div class="pt-10 h-full">
    <div class="flex flex-col h-full">
      <h1 class="text-4xl m-3 text-center">Karantenehjelpen</h1>
      <div class="flex-1 mx-auto">
        <p class="font-bold text-lg m-3">Hva er Karantenehjelpen?</p>
        <p class="m-3">Når du sitter i hjemmekarantene skal du ikke oppholde
          deg på steder der man lett kommer nær andre.
          Da kan det bli veldig vanskelig å få handlet inn.
          <br>
          <br>
          Karantenehjelpen skal hjelpe de som sitter i karantene
          komme i kontakt med friske folk som ønsker å hjelpe.
          <br>
          <br>
          Vi trenger både folk som er friske og vil stille opp for sine naboer,
          og tilbyr handlehjelp til de som trenger det mest.
        </p>
        <h3 class="font-bold text-lg m-3">Følg FHI sine råd!</h3>
        <p class="m-3">
          Just do it
        </p>
        <p class="text-center mt-20 font-bold">Logg inn med Google</p>
        <div class="flex flex-col">
          <a @click="socialLogin" class="self-center cursor-pointer">
            <img alt="Google Logo" src="../assets/google-logo.png" class="h-24">
          </a>
        </div>
      </div>
      <footer class="w-full text-center border-t border-grey p-4 pin-b" id="forBgColor">
        <p>
          Karantenehjelpen@online.ntnu.no
        </p>
      </footer>
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

<style lang="scss" scoped>
#forBgColor{
  background-color: rgb(0, 96, 163);
  color: white;
}
</style>
