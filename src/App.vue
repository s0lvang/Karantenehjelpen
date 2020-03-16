<template>
  <div id="app">
    <Menu v-if="getUser && this.$route.name !== 'StartScreen'" />
    <Page>
      <router-view />
    </Page>
    <footer>
      <a href="mailto:karantenehjelpen@online.ntnu.no">
        karantenehjelpen@online.ntnu.no
      </a>
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
@import "@/assets/reset.scss";
@import "@/common/constants.scss";
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro|Source+Serif+Pro&display=swap");

html,
body,
#app {
  height: 100%;
}

#app {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  color: $color-text;
  line-height: 1.5;
}

footer {
  padding: 1rem;
  background: $color-primary;
  text-align: center;

  a {
    color: $color-text-contrast;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Source Serif Pro", serif;
}
</style>
