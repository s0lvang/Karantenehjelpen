<template>
  <div class="pt-10 h-full">
    <div class="flex flex-col h-full">
      <div >
        <p class="text-3xl text-center pb-20">
          Karantenehjelpen
        </p>
      </div>
      <div class="flex-1 mx-auto">
        <p class="text-center break-words ml-10 mr-10">
          Jeg sitter i karantene og trenger hjelp til å handle inn mat
        </p>
        <Button btnText="TRENGER HJELP" :btnDisabled="false" @btnClicked="needHelp" />
        <p class="text-center pt-20 break-words ml-10 mr-10">
          Jeg er frisk og vil gjerne hjelpe noen som trenger handlehjelp
        </p>
        <Button btnText="VIL HJELPE" :btnDisabled="false" @btnClicked="giveHelp" />
      </div>
      <footer class="w-full text-center border-t border-grey p-4 pin-b" id="forBgColor">
        <p>
          Karantenehjelpen@online.ntnu.no
        </p>
      </footer>
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

<style lang="scss" scoped>
#forBgColor{
  background-color: rgb(0, 96, 163);
  color: white;
}
</style>
