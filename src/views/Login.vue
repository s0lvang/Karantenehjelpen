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
    <GoogleLoginButton />
    <hr class="hr-text" data-content="OR" />
    <LoginField />
  </section>
</template>

<script>
import GoogleLoginButton from "@/components/GoogleLoginButton.vue";
import LoginField from "@/components/LoginField.vue";

export default {
  name: "login",
  components: {
    GoogleLoginButton,
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
.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: 0.5;
  &:before {
    content: "";
    // use the linear-gradient for the fading effect
    // use a solid background color for a solid bar
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: "Eller";
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 0.5em;
    line-height: 1.5em;
    // this is really the only tricky part, you need to specify the background color of the container element...
    color: #818078;
    background-color: #fcfcfa;
  }
}
</style>
