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
    ></textarea>
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
