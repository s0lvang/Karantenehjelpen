<template>
  <div>
    <label for="number-input">{{ labelText }}</label>
    <input
      type="tel"
      name="number-input"
      @input="emitNumberInput"
      :placeholder="placeholderText"
      :value="existing"
      min="1"
      pattern="[0-9]"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

function checkPhone(phone) {
  const phoneRegex = /[0-9]{8}/g;
  if (phoneRegex.test(phone)) {
    return true;
  }

  return false;
}

export default Vue.extend({
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
      this.$emit("emitNumberInput", event, checkPhone(event.target));
    }
  }
});
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
