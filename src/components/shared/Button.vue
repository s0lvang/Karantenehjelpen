<template>
  <div class="btnDiv">
    <button
      @click="btnClick"
      class="button_style"
      :class="isDanger"
      :disabled="btnDisabled"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'Button',
  props: {
    btnText: {
      type: String,
      required: true,
    },
    btnDisabled: {
      type: Boolean,
      required: true,
    },
    isDanger: String,
  },
  methods: {
    btnClick() {
      this.$emit('btnClicked');
    },
  },
};
</script>

<style lang="scss" scoped>
.btnDiv {
  display: flex;
  justify-content: space-around;
  -moz-box-align: center;
  align-items: center;
  margin: 2rem 0px;
}
.button_style {
  background-color: rgb(0, 96, 163);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  display: flex;
  margin: auto;
  cursor: pointer;
  &:hover {
    background-color: rgb(3, 141, 240);
  }
  &:disabled {
    color: #555658;
    border-color: 1px solid rgb(241, 241, 241);
    background-color: #ECECEC;
  }
  &.true{
    background-color: #DF2020
  }
}
</style>
