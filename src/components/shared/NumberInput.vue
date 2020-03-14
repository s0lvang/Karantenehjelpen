<template>
  <div class="main">
    <label for="number-input"> {{ labelText }} </label>
    <input
      type="number"
      name="number-input"
      @input="emitNumberInput"
      :placeholder="placeholderText"
      min="1"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NumberInput',
  props: {
    labelText: {
      type: String,
      required: true,
    },
    placeholderText: {
      type: String,
      required: true,
    },
  },
  methods: {
    emitNumberInput(event) {
      this.$emit('emitNumberInput', event);
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  margin-top: 0.5rem;
}
label {
  align-self: flex-start;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  color: rgb(0, 96, 163);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input {
  &[type="number"] {
    max-width: 200px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
    padding: 0.625em 1em;
    font-size: 1em;
    color: rgb(42, 39, 34);
    -moz-appearance: textfield;
    border: 1px solid rgb(241, 241, 241);
  }
}
</style>
