<template>
  <button @click="btnClick" :class="isDanger" :disabled="btnDisabled">
    {{ btnText }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    btnText: {
      type: String,
      required: true
    },
    btnDisabled: {
      type: Boolean,
      required: true
    },
    isDanger: String
  },
  methods: {
    btnClick() {
      this.$emit("btnClicked");
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  display: block;
  background: $color-primary;
  color: $color-text-contrast;
  padding: 1rem;
  border-radius: 4px;
  line-height: 1;
  letter-spacing: 1px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s, opacity 0.2s;

  &:hover:not(:disabled) {
    background: lighten($color-primary, 10%);
  }

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  &.true {
    background: $color-danger;

    &:hover {
      background: lighten($color-danger, 10%);
    }
  }
}
</style>
