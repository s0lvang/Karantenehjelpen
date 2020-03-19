<template>
  <div id="app">
    <Menu />
    <Page>
      <router-view />
    </Page>
    <Footer />
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import Page from "@/components/Page.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Menu,
    Page,
    Footer
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
</style>
