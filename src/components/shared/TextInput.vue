<template>
  <div class="container">
    <label class="input_label" for="text-input"> {{ labelText }} </label>
    <input
      type="text"
      name="text-input"
      @input="emitInputText"
      :placeholder="placeholderText"
      class="text_input"
      :value="existing"
    />
  </div>
</template>

<script>

export default {
  name: 'TextInput',
  props: {
    labelText: {
      type: String,
      required: true,
    },
    placeholderText: {
      type: String,
      required: true,
    },
    localIndex: {
      type: Number,
      required: false,
    },
    existing: String,
  },
  methods: {
    emitInputText(event) {
      this.$emit('emitInputText', event, this.localIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
}
.input_label {
  align-self: flex-start;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  color: rgb(0, 96, 163);
}
.text_input {
  &[type="text"] {
    max-width: 200px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
    padding: 0.625em 1em;
    font-size: 1em;
    color: rgb(42, 39, 34);
    border: 1px solid rgb(241, 241, 241);
  }
}
</style>
