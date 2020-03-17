<template>
  <section>
    <h1>
      Karantenehjelpen
    </h1>
    <div class="role">
      <h2>Trenger hjelp</h2>
      <p>
        Jeg sitter i karantene og trenger hjelp til å handle inn mat
      </p>
      <Button
        btnText="Ny bestilling"
        :btnDisabled="false"
        @btnClicked="needHelp"
      />
    </div>
    <div class="role">
      <h2>Ønsker å hjelpe</h2>
      <p>
        Jeg er frisk og vil gjerne hjelpe noen som trenger handlehjelp
      </p>
      <Button
        btnText="Til oppdragslisten"
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
h1 {
  display: none;
}
.role {
  @include card;
  text-align: center;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  button {
    margin: 2rem auto 1rem;
  }
}

@media #{$tabletAndUp} {
  section {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  h1 {
    display: inherit;
    text-align: center;
    grid-column: 1 / -1;
  }

  .role {
    margin: 0;
  }
}
</style>
