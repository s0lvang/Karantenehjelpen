<template>
  <div>
    <div>
      <p>
        Jeg sitter i karantene og trenger hjelp
      </p>
      <Button btnText="TRENGER HJELP" :btnDisabled="false" @btnClicked="needHelp" />
    </div>
    <div>
      <p>
        Jeg er frisk og vil hjelpe
      </p>
      <Button btnText="VIL HJELPE" :btnDisabled="false" @btnClicked="giveHelp" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/shared/Button.vue';

export default {
  name: 'StartScreenView',
  components: {
    Button,
  },
  methods: {
    needHelp() {
      this.$router.push('create-request');
    },
    giveHelp() {
      this.$router.push('all-requests');
    },
  },
};
</script>

<style>

</style>
