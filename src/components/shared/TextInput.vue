<template>
  <div class="container">
    <label for="text-input">{{ labelText }}</label>
    <input
      :type="inputType"
      name="text-input"
      @input="emitInputText"
      :placeholder="placeholderText"
      :value="existing"
    />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    labelText: {
      type: String,
      required: true
    },
    placeholderText: {
      type: String,
      required: true
    },
    localIndex: {
      type: Number,
      required: false
    },
    inputType: {
      type: String,
      default: "text",
      required: false
    },

    existing: String
  },
  methods: {
    emitInputText(event) {
      this.$emit("emitInputText", event, this.localIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
}
</style>
