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
  margin: $vertical-space auto;
  flex: 1;
}

@media #{$tabletAndUp} {
  article {
    max-width: $page-width-tablet;
    margin: $vertical-space-large auto;
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
