<template>
  <header>
    <a
      tabIndex="0"
      class="brand"
      @click="navigate('StartScreen')"
      v-on:keyup.enter="navigate('StartScreen')"
      v-on:keyup.space="navigate('StartScreen')"
    >
      <img src="@/assets/logo.svg" alt="logo" />
      <h1>
        Karantenehjelpen
      </h1>
    </a>
    <svg
      v-if="getUser"
      @click="toggle"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Meny</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
    <nav v-if="getUser" :class="open ? 'block' : 'hidden'">
      <a
        tabIndex="0"
        @click="navigate('AllRequests')"
        v-on:keyup.enter="navigate('AllRequests')"
        v-on:keyup.space="navigate('AllRequests')"
      >
        Oppdragslisten
      </a>
      <a
        tabIndex="0"
        @click="navigate('MyAssignedRequests')"
        v-on:keyup.enter="navigate('MyAssignedRequests')"
        v-on:keyup.space="navigate('MyAssignedRequests')"
      >
        Mine oppdrag
      </a>
      <span class="divider" />
      <a
        tabIndex="0"
        @click="navigate('CreateRequest')"
        v-on:keyup.enter="navigate('CreateRequest')"
        v-on:keyup.space="navigate('CreateRequest')"
      >
        Ny bestilling
      </a>
      <a
        tabIndex="0"
        @click="navigate('MyRequests')"
        v-on:keyup.enter="navigate('MyRequests')"
        v-on:keyup.space="navigate('MyRequests')"
      >
        Mine bestillinger
      </a>
      <span class="divider" />
      <a
        tabIndex="0"
        @click="navigate('MyPage')"
        v-on:keyup.enter="navigate('MyPage')"
        v-on:keyup.space="navigate('MyPage')"
      >
        Min side
      </a>
      <a
        tabIndex="0"
        @click="logout"
        v-on:keyup.enter="logout"
        v-on:keyup.space="logout"
      >
        Logg ut
      </a>
    </nav>
  </header>
</template>

<script>
import { signOut } from "@/services/firebase";

const camelToLisp = str =>
  str.replace(/[\w]([A-Z])/g, m => `${m[0]}-${m[1]}`).toLowerCase();

export default {
  name: "Menu",
  data() {
    return {
      open: false
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    },
    navigate(to) {
      /**
       * Check om inkommende route er samme som nåværende. Hvis ikke,
       * gjør om MæhmedPakkaBaggen til mæhmed-pakka-bagen, fordi det er
       * sånn routesene ser ut.
       */
      if (this.$route.name !== to) {
        this.$router.push(`/${camelToLisp(to)}`);
      }
      this.close();
    },
    logout() {
      signOut(() => {
        this.$store.dispatch("SET_CURRENT_USER", null);
        this.$router.push("/login");
        this.close();
      });
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>
<style lang="scss" scoped>
$contentSize: 2rem;
$contentSize-large: 2.5rem;
header {
  position: sticky;
  top: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ($headerHeight - $contentSize) / 2 2rem;
  box-shadow: 0 2px 4px rgba($color-text, 0.25);
  z-index: 200;
}

img {
  height: 2rem;
  display: inline-block;
  vertical-align: bottom;
  margin-right: 0.5rem;
}

h1 {
  display: inline-block;
  font-size: 1.5rem;
  line-height: 2rem;
  margin: 0;
}

svg {
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;

  path {
    fill: $color-text;
  }
}

nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  left: 0;
  top: $headerHeight;
  color: white;
  z-index: 100;
  height: calc(100vh - #{$headerHeight});
  transition: background 0.25s;

  &.hidden {
    background: transparent;
    height: 0;

    & > a {
      display: none;
    }
  }

  &.block {
    background: $color-primary;
  }

  & > a {
    font-size: 1.5rem;
    padding: 1rem;
    margin: 0 0.5rem;
    border-bottom: 1px solid white;

    &:hover {
      color: white;
    }
  }
}

.divider {
  display: hidden;
}

@media #{$tabletAndUp} {
  header {
    padding: ($headerHeight-large - $contentSize-large) / 2 2rem;
  }
  h1 {
    line-height: 2.5rem;
    font-size: 2rem;
  }
  img {
    height: 2.5rem;
  }

  nav {
    top: $headerHeight-large;
    height: calc(100vh - 4.5rem);
  }
}

@media #{$desktopAndUp} {
  nav {
    display: block;
    position: static;
    box-shadow: none;
    border: none;
    transform: none;
    width: inherit;
    color: inherit;
    height: auto;
    background: transparent;

    &.hidden {
      height: auto;

      & > a {
        display: inline-block;
      }
    }

    & > a {
      padding: 0;

      &:hover {
        color: $color-text;
      }

      &:not(:first-child) {
        border: none;
      }
    }
  }
  svg {
    display: none;
  }
  .divider {
    display: inline-block;
    background: $color-text;
    width: 2px;
    height: 2rem;
    margin: -0.5rem 1rem;

    &:first-of-type {
      background: $color-background-contrast;
      margin: -0.5rem 0.5rem;
    }
  }
}
</style>
