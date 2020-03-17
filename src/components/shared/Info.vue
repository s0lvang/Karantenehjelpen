<template>
  <p><icon name="info" /> <slot></slot></p>
</template>

<script>
import Icon from "@/components/shared/Icon.vue";

export default {
  name: "Info",
  components: {
    Icon
  }
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
  color: $color-primary;
}
</style>
