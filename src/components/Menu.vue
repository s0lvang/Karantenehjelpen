<template>
  <header id="forBGcolor">
    <a class="brand" @click="goToStart">
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
      <a @click="toAllRequests">
        Oppdragslisten
      </a>
      <a @click="myAssignedRequests">
        Mine oppdrag
      </a>
      <span class="divider" />
      <a @click="newRequest">
        Ny bestilling
      </a>
      <a @click="myRequests">
        Mine bestillinger
      </a>
      <span class="divider" />
      <a @click="logout" id="onlyHover">
        Logg ut
      </a>
    </nav>
  </header>
</template>

<script>
import fb from "firebase";

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
    myRequests() {
      if (this.$route.name !== "MyRequests") {
        this.$router.push("/my-requests");
      }
      this.toggle();
    },
    myAssignedRequests() {
      if (this.$route.name !== "MyAssignedRequests") {
        this.$router.push("/my-assigned-requests");
      }
      this.toggle();
    },
    toAllRequests() {
      if (this.$route.name !== "AllRequests") {
        this.$router.push("/all-requests");
      }
      this.toggle();
    },
    newRequest() {
      if (this.$route.name !== "CreateRequest") {
        this.$router.push("/create-request");
      }
      this.toggle();
    },
    goToStart() {
      if (this.$route.name !== "StartScreen") {
        this.$router.push("/start-screen");
      }
    },
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("SET_CURRENT_USER", null);
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(`something went wrong ${error.message}`);
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
header {
  position: relative;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(black, 0.25);
  margin-bottom: 2rem;
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
  width: 1.5rem;
  height: 1.5rem;

  path {
    fill: $color-text;
  }
}

.hidden {
  display: none;
}

nav {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  left: 0;
  bottom: 0;
  background: white;
  border-top: 1px solid $color-text;
  box-shadow: 0 2px 4px rgba(black, 0.25);
  transform: translateY(100%);
  z-index: 1;

  & > a {
    padding: 1rem;
    margin: 0 0.5rem;

    &:not(:first-child) {
      border-top: 1px solid $color-background-contrast;
    }
  }
}

.divider {
  display: inline-block;
  height: 2px;
  margin: 0 0.5rem;
  background: $color-text;
}

@media #{$tabletAndUp} {
  header {
    margin-bottom: 4rem;
  }
  h1 {
    font-size: 2rem;
    line-height: 2.5rem;
  }
  img {
    height: 2.5rem;
  }
}

@media #{$desktopAndUp} {
  nav,
  .hidden {
    display: block;
    position: static;
    box-shadow: none;
    border: none;
    transform: none;
    width: inherit;

    & > a {
      padding: 0;

      &:not(:first-child) {
        border: none;
      }
    }
  }
  svg {
    display: none;
  }
  .divider {
    width: 2px;
    height: 2rem;
    margin: -0.5rem 1rem;
  }
}
</style>
