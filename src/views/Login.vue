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
    <LoginButton />
  </section>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";

export default {
  name: "login",
  components: {
    LoginButton
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 4rem;
  text-align: center;
}
button {
  margin: 2rem auto;
}
</style>
