<template>
  <article><slot></slot></article>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/common/constants.scss";

article {
  padding: 0 2rem;
  margin: 0 auto;
  flex: 1;
}

@media #{$breakpoint-tabletAndUp} {
  article {
    max-width: $page-width-tablet;
  }
}

@media #{$breakpoint-desktopAndUp} {
  article {
    max-width: $page-width-desktop;
  }
}

@media #{$breakpoint-widescreenAndUp} {
  article {
    max-width: $page-width-widescreen;
  }
}
</style>
