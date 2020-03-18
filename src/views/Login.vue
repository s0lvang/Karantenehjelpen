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
      Karantenehjelpen skal hjelpe de som sitter i karantene å komme i kontakt
      med friske folk som ønsker å hjelpe.
    </p>
    <p>
      Vi trenger både folk som er friske og vil stille opp for sine naboer, og
      tilbyr handlehjelp til de som trenger det mest.
    </p>
    <strong>Følg FHI sine råd!</strong>
    <p>
      Hold avstand til hverandre, prøv å unngå å ta deg selv i ansiktet, og
      praktiser god håndhygiene.
      <a href="https://www.fhi.no/sv/smittsomme-sykdommer/corona/"
        >Se her for mer informasjon.</a
      >
    </p>
    <LoginField />
    <LoginButton />
  </section>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";
import LoginField from "@/components/LoginField.vue";

export default {
  name: "login",
  components: {
    LoginButton,
    LoginField
  }
};
</script>

<style lang="scss" scoped>
h1 {
  display: none;
}

button {
  margin: 2rem auto;
}

@media #{$tabletAndUp} {
  h1 {
    display: inherit;
    margin-top: 4rem;
    text-align: center;
  }
}
</style>
