<template>
  <article><slot></slot></article>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
article {
  width: 100%;
  padding: 0 2rem;
  margin: 0 auto;
  flex: 1;
}

@media #{$tabletAndUp} {
  article {
    max-width: $page-width-tablet;
  }
}

@media #{$desktopAndUp} {
  article {
    max-width: $page-width-desktop;
  }
}

@media #{$widescreenAndUp} {
  article {
    max-width: $page-width-widescreen;
  }
}
</style>
