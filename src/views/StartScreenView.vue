<template>
  <section>
    <div class="role">
      <h3>Trenger hjelp</h3>
      <p>
        Jeg sitter i karantene og trenger hjelp til å handle inn mat.
      </p>
      <ol>
        <li>Legg inn din ordre.</li>
        <li>Vent på at noen foretar din handel.</li>
        <li>Plukk opp dine varer og betal.</li>
      </ol>
      <Button
        btnText="Legg inn ny bestilling"
        :btnDisabled="false"
        @btnClicked="needHelp"
      />
    </div>
    <div class="role">
      <h3>Ønsker å hjelpe</h3>
      <p>
        Jeg er frisk og vil gjerne hjelpe noen som trenger handlehjelp
      </p>
      <ol>
        <li>Velg et oppdrag.</li>
        <li>Handle varene.</li>
        <li>Lever på døra, men hold avstand!</li>
      </ol>
      <Button
        btnText="Hjelp andre med å handle"
        :btnDisabled="false"
        @btnClicked="giveHelp"
      />
    </div>
  </section>
</template>

<script>
import Button from "@/components/shared/Button.vue";

export default {
  name: "StartScreenView",
  components: {
    Button
  },
  methods: {
    needHelp() {
      this.$router.push("create-request");
    },
    giveHelp() {
      this.$router.push("all-requests");
    }
  }
};
</script>

<style lang="scss" scoped>
.role {
  @include card;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  button {
    margin: 1rem auto 0rem;
  }
  h3 {
    text-align: center;
  }
}

ol {
  text-align: left;
  list-style-type: decimal;
  padding-left: 1rem;
  margin-top: 1rem;
}

@media #{$tabletAndUp} {
  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .role {
    margin: 0;
    place-self: start;
  }
}
</style>
