<template>
  <div>
    <div>
      <div>
        <p>
          Karantenehjelpen
        </p>
      </div>
      <div>
        <p>
          Jeg sitter i karantene og trenger hjelp til å handle inn mat
        </p>
        <Button
          btnText="TRENGER HJELP"
          :btnDisabled="false"
          @btnClicked="needHelp"
        />
        <p>
          Jeg er frisk og vil gjerne hjelpe noen som trenger handlehjelp
        </p>
        <Button
          btnText="VIL HJELPE"
          :btnDisabled="false"
          @btnClicked="giveHelp"
        />
      </div>
    </div>
  </div>
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
