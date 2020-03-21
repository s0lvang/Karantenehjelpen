<template>
  <section>
    <h1 class="title">Karantenehjelpen</h1>
    <GoogleLoginButton />
    <hr class="hr-text" data-content="OR" />
    <LoginArea />
    <strong>Hva er Karantenehjelpen?</strong>
    <p>
      Når du sitter i hjemmekarantene skal du ikke oppholde deg på steder der
      man lett kommer nær andre. Da kan det bli veldig vanskelig å få handlet
      inn det man trenger til livets opphold.
    </p>
    <p>
      Karantenehjelpen er til for å hjelpe de som sitter i karantene å komme i
      kontakt med friske folk som ønsker å hjelpe.
    </p>
    <p>
      Vi trenger friske folk som har lyst til å delta i den nasjonale dugnaden
      ved å hjelpe dem som sitter i karantene med innkjøp.
    </p>
    <strong>Følg FHI sine råd!</strong>
    <p>
      Hold avstand til hverandre, prøv å unngå å ta deg selv i ansiktet, og
      praktiser god håndhygiene.
      <a
        href="https://www.fhi.no/sv/smittsomme-sykdommer/corona/"
        target="_blank"
        >Se her for mer informasjon.</a
      >

      Vi anbefaler også å følge
      <a href="https://ila.frivilligsentral.no/irisfile/189790/" target="_blank"
        >Løkkan og Ila Frivillighetssentraler sine rutiner for praktiske
        frivillige tjenester</a
      >
    </p>
    <strong>Hvem står bak Karantenehjelpen?</strong>
    <p>
      Nettsiden ble startet opp av en gjeng Informatikk-studenter på NTNU, og
      drift og utvikling skjer på frivillig basis. Kildekoden ligger
      tilgjengelig
      <a href="https://github.com/s0lvang/Karantenehjelpen" target="_blank"
        >på GitHub</a
      >, hvor hvem som helst kan bidra. Tjenesten er helt gratis å bruke, og vil
      aldri inneholde reklamer. Vi har mottat støtte til driftsutgifter fra
      <a href="https://velferdstinget.no/" target="_blank">Velferdstinget</a>,
      <a href="https://www.trondheim.no/student" target="_blank"
        >StudyTrondheim</a
      >, og
      <a href="https://www.ntnu.no/ie" target="_blank">IE-fakultetet ved NTNU</a
      >.
    </p>
  </section>
</template>

<script>
import GoogleLoginButton from "@/components/GoogleLoginButton.vue";
import LoginArea from "@/components/LoginArea.vue";
import {
  setUpGoogleSignInCompleteListener,
  handleSignedIn
} from "@/helpers/auth";

export default {
  name: "login",
  components: {
    GoogleLoginButton,
    LoginArea
  },
  created() {
    try {
      setUpGoogleSignInCompleteListener(result => {
        const { user } = result;
        if (user) {
          handleSignedIn(this, user);
        }
      });
    } catch (err) {
      /* TODO: We should have a handler here for when we add Vipps etc
          if (errorCode === "auth/account-exists-with-different-credential") {
            alert(
              "You have already signed up with a different auth provider for that email."
            );
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
          */
      console.error(err);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 3rem;
  text-align: center;
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
