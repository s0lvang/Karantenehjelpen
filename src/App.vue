<template>
  <div id="app">
    <Menu />
    <Page>
      <router-view />
    </Page>
    <footer>
      <a href="mailto:karantenehjelpen@online.ntnu.no"
        >karantenehjelpen@online.ntnu.no</a
      >
    </footer>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import Page from "@/components/Page.vue";

export default {
  components: {
    Menu,
    Page
  }
};
</script>

<style lang="scss">
@import "@/common/base.scss";

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
}

footer {
  padding: 1rem;
  margin-top: $vertical-space;
  background: $color-primary;
  text-align: center;

  a:link,
  a:visited {
    color: $color-text-contrast;
  }

  @media #{$tabletAndUp} {
    margin-top: $vertical-space-large;
  }
}
</style>
