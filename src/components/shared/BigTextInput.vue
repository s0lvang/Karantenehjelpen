<template>
  <div class="container">
    <label class="input_label" for="comment">{{ labelText }}</label>
    <textarea
      rows="4"
      maxlength="1000"
      name="comment"
      @input="handleInput"
      :value="existing"
      :placeholder="placeholderText"
    >
    </textarea>
  </div>
</template>

<script>
export default {
  name: "BigTextInput",
  methods: {
    handleInput(event) {
      this.$emit("change", event.target.value);
    }
  },
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
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  margin-top: 1rem;
}

textarea {
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  padding: 0.625em 1em;
  font-size: 1em;
  color: rgb(42, 39, 34);
  border: 1px solid rgb(241, 241, 241);
}

.input_label {
  align-self: flex-start;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  color: rgb(0, 96, 163);
}
</style>
