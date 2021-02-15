<template>
  <section>
    <h1 class="title">Karantenehjelpen</h1>
    <GoogleLoginButton />
    <hr class="hr-text" data-content="OR" />
    <LoginArea />
    <strong>Hva er Karantenehjelpen?</strong>
    <p>
      Karantenehjelpen er en nettside hvor personer som ikke har mulighet til å
      utføre hverdagslige oppgaver grunnet koronaviruset kan komme i kontakt med
      friske personer som ønsker å hjelpe til.
    </p>
    <p>
      Om du skulle trenge hjelp med å handle inn matvarer, eller gå tur med
      hunden din, kan du legge ut en enkel forespørsel på nettsiden. Da vil den
      dukke opp for alle som har lyst til å hjelpe deg, og forhåpentligvis vil
      en av de ta på seg oppdraget!
    </p>
    <strong>Følg FHI sine råd!</strong>
    <p>
      Det er viktig at alle bidrar i nasjonaldugnaden, derfor oppfordrer vi på
      det sterkeste at du følger FHI sine råd. Hold avstand til hverandre, prøv
      å unngå å ta deg selv i ansiktet, og praktiser god håndhygiene.
      <a
        href="https://www.fhi.no/sv/smittsomme-sykdommer/corona/"
        target="_blank"
        >Se her for mer informasjon.</a
      >
    </p>
    <p>
      Vi anbefaler også å følge
      <a href="https://ila.frivilligsentral.no/irisfile/189790/" target="_blank"
        >Løkkan og Ila Frivillighetssentraler sine rutiner for praktiske
        frivillige tjenester</a
      >
      om man skal ut på oppdrag.
    </p>
    <strong>Historie</strong>
    <p>
      I midten av uke 11 hørte vi at helsefagstudentene ble bedt om å bidra i
      helsetjenesten. Vi som IT-studenter tenkte, vi også kompetanse som kan
      være relevant. Så vi kastet oss rundt å startet dette prosjektet. Teamet
      vokste fort. Det var mange i linjeforeningen Online som syntes prosjektet
      var spennende, og innen lansering 18. mars var vi 7 på teamet og flere har
      vi blitt siden.
    </p>
    <p>
      I løpet av den intense uken med utvikling dukket det opp flere store
      facebook grupper med folk som ønsket å hjelpe til i den nasjonalle
      dugnaden. Det bekreftet vår hypotese om dugnadsviljen i Norge og motiverte
      oss til å fortsette. Når vi lanserte 18. mars ble vi møtt av en utrolig
      respons. Siden den gang har vi fått økonomisk støtte fra
      <a href="https://velferdstinget.no/" target="_blank"
        >Velferdstinget i Gjøvik, Ålesund og Trondheim</a
      >,
      <a href="https://www.trondheim.no/student" target="_blank"
        >StudyTrondheim</a
      >
      og
      <a href="https://www.ntnu.no/ie" target="_blank">IE-fakultetet ved NTNU</a
      >. Vi har også fått administrativ støtte fra
      <a href="https://online.ntnu.no" target="_blank">Linjeforeningen Online</a
      >.
    </p>
    <p>
      Planen fremover er å videreutvikle løsningen og forsøke å være så klare
      som vi kan for å fortsette støtten til de som ønsker å bidra i den
      nasjonale dugnaden.
    </p>
    <strong>Bidra</strong>
    <p>
      Karantenehjelpen er et open-source prosjekt og derfor vil vi gjerne ønske
      dere velkommen til å bidra
      <a href="https://github.com/s0lvang/Karantenehjelpen" target="_blank"
        >på GitHub</a
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

p {
  margin-bottom: 0.5em;
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
