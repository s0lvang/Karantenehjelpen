<template>
  <i class="material-icons-outlined">{{ name }}</i>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String
  }
};
</script>

<style lang="scss" scoped>
i {
  color: inherit;
  font-size: inherit;
  vertical-align: middle;
}
</style>
