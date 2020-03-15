<template>
  <div class="container mx-auto mt-10" >
    <div class="flex flex-col">
      <p class="text-center">
        Jeg sitter i karantene og trenger hjelp
      </p>
      <Button btnText="TRENGER HJELP" :btnDisabled="false" @btnClicked="needHelp" />
    </div>
    <div>
      <p class="text-center">
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
