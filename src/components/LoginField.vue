<template>
  <div class="container">
    <TextInput class="xd" labelText="Email" />
    <TextInput class="xd" inputType="password" labelText="Passord" />
  </div>
</template>

<script>
import TextInput from "@/components/shared/TextInput.vue";

export default {
  name: "LoginField",
  components: {
    TextInput
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
