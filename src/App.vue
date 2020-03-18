<template>
  <div id="app">
    <Menu v-if="getUser" />
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
  },
  computed: {
    getUser() {
      return this.$store.getters.currentUser;
    }
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
  background: $color-primary;
  text-align: center;

  a:link,
  a:visited {
    color: $color-text-contrast;
  }

  a:focus {
    @include outline-contrast;
  }
}
</style>
