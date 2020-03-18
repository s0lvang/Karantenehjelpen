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
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NumberInput",
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
      this.$emit("emitNumberInput", event);
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
