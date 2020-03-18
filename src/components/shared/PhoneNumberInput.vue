<template>
  <div>
    <label for="number-input">{{ labelText }}</label>
    <input
      type="tel"
      name="number-input"
      @input="emitNumberInput"
      :placeholder="placeholderText"
      :value="existing"
      maxlength="8"
    />
  </div>
</template>

<script>
export default {
  name: "PhoneNumberInput",
  props: {
    labelText: {
      type: String,
      required: true
    },
    placeholderText: {
      type: String,
      required: true
    },
    existing: String
  },
  methods: {
    emitNumberInput(event) {
      if (this.checkPhone(event.target.value)) {
        this.$emit("emitButton", false);
        this.$emit("emitNumberInput", event);
      } else {
        this.$emit("emitButton", true);
      }
    },
    checkPhone(phone) {
      const phoneRegex = /[0-9]{8}/g;
      if (phoneRegex.test(phone)) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
