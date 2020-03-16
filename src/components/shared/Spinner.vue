<template>
  <div class="spinner" v-if="showSpinner"/>
</template>

<script>
export default {
  props: {
    showSpinner: {
      required: true,
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
//https://codeburst.io/how-to-create-a-simple-css-loading-spinner-make-it-accessible-e5c83c2e464c

@keyframes spinner {
  0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}
.spinner {
  height: 10vh;
  opacity: 1;
  position: relative;
  transition: opacity linear 0.1s;
  &::before {
      animation: 2s linear infinite spinner;
      border: solid 3px #eee;
      border-bottom-color: rgb(0, 96, 163);
      border-radius: 50%;
      content: "";
      height: 40px;
      left: 50%;
      opacity: inherit;
      position: absolute;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      transform-origin: center;
      width: 40px;
      will-change: transform;
  }
}
</style>
