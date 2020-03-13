<template>
  <div>
    <div>
      <p>
        Jeg sitter i karantene og trenger hjelp
      </p>
      <Button btnText="TRENGER HJELP" :btnDisabled="false" @click="needHelp" />
    </div>
    <div>
      <p>
        Jeg er frisk og vil hjelpe
      </p>
      <Button btnText="VIL HJELPE" :btnDisabled="false" @click="giveHelp" />
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
      console.log('WAT');
    },
    giveHelp() {
      console.log('y no work');
      this.$router.push('all-requests');
    },
  },
};
</script>

<style>

</style>
