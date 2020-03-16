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

:root {
  --font-base-size: 1.2rem;
  --font-min-scale: 1;
  --font-max-scale: 1.2;
  --font-size: calc(var(--font-base-size) * var(--font-min-scale));
  --font-size-xxs: calc(var(--font-size) / (1.25 * 1.25 * 1.25));
  --font-size-xs: calc(var(--font-size) / (1.25 * 1.25));
  --font-size-sm: calc(var(--font-size) / 1.25);
  --font-size-md: calc(var(--font-size));
  --font-size-lg: calc(var(--font-size) * 1.25);
  --font-size-xl: calc(var(--font-size) * 1.25 * 1.25);
  --font-size-xxl: calc(var(--font-size) * 1.25 * 1.25 * 1.25);
  /*
    Borrowed from https://css-tricks.com/snippets/css/fluid-typography/:
    font-size: calc([min-size] + ([max-size] - [min-size]) * ((100vw - [min-view-size]px) / ([max-view-size] - [min-view-size])))
    */
  @media #{$breakpoint-tabletAndUp} {
    --font-size: calc(
      var(--font-min-scale) *
        (
          var(--font-base-size) + (1.2 * 16) *
            (var(--font-max-scale) - var(--font-min-scale)) *
            (
              (100vw - #{$minTabletWidth}) / #{$minDesktopWidth} - #{$minTabletWidth}
            )
        )
    );
  }
  @media #{$breakpoint-desktopAndUp} {
    --font-size: calc(var(--font-base-size) * var(--font-max-scale));
  }
}

html,
body,
#app {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}

body {
  background: $color-background;
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
  margin: 4rem 0 2rem;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}

img {
  display: block;
  max-width: 100%;
}

h1 {
  font-size: var(--font-size-xxl);
  line-height: 6rem;
}
h2 {
  font-size: calc(var(--font-size-xl));
  line-height: 3.75rem;
}
h3 {
  font-size: calc(var(--font-size-lg));
  line-height: 3.125rem;
}
h4 {
  font-size: calc(var(--font-size-md));
  line-height: 2.5rem;
  font-weight: 900;
}
h5 {
  font-size: calc(var(--font-size-sm));
  line-height: 2rem;
  font-weight: 900;
}
h6 {
  font-size: calc(var(--font-size-xs));
  line-height: 2rem;
  font-weight: 900;
}
</style>
