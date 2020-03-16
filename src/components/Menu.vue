<template>
  <nav id="forBGcolor">
    <div>
      <a @click="goToStart">
        Karantenehjelpen
      </a>
    </div>
    <div>
      <button @click="toggle">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Meny</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div :class="open ? 'block' : 'hidden'">
      <div>
        <a @click="toAllRequests">
          Oppdragslisten
        </a>
      </div>
      <div>
        <a @click="myAssignedRequests">
          Mine oppdrag
        </a>
      </div>
      <div>
        <a @click="newRequest">
          Ny bestilling
        </a>
      </div>
      <div>
        <a @click="myRequests">
          Mine bestillinger
        </a>
      </div>
      <div>
        <a @click="logout" id="onlyHover">
          Logg ut
        </a>
      </div>
    </div>
  </nav>
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
        this.toggle();
      }
    },
    myAssignedRequests() {
      if (this.$route.name !== "MyAssignedRequests") {
        this.$router.push("/my-assigned-requests");
        this.toggle();
      }
    },
    toAllRequests() {
      if (this.$route.name !== "AllRequests") {
        this.$router.push("/all-requests");
        this.toggle();
      }
    },
    newRequest() {
      if (this.$route.name !== "CreateRequest") {
        this.$router.push("/create-request");
        this.toggle();
      }
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
  }
};
</script>
<style lang="scss" scoped>
#forBGcolor {
  background-color: #0060a3;
}
#onlyHover:hover {
  color: #0060a3;
}
</style>
