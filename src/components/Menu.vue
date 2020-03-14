<template>
  <nav id="asd" class="flex items-center justify-between flex-wrap bg-black p-6">
    <div class="flex items-center flex-no-shrink mr-6 text-white" >
      <span class="font-semibold text-xl tracking-tight" >Karantenehjelpen</span>
    </div>
    <div class="block sm:hidden">
      <button @click="toggle" class="flex items-center px-3 py-2 border rounded">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Meny</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>
      </button>
    </div>
    <div :class="open ? 'block': 'hidden'"
      class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
    >
      <div class="text-sm sm:flex-grow">
        <a @click="toAllRequests"
          class="no-underline block mt-4 sm:inline-block sm:mt-0 mr-4 text-white
          cursor-pointer">
          Oppdragslisten
        </a>
      </div>
      <div class="text-sm sm:flex-grow">
        <a @click="dummyClick"
          class="no-underline block mt-4 sm:inline-block sm:mt-0 mr-4 text-white
          cursor-pointer">
          Mine oppdrag
        </a>
      </div>
      <div class="text-sm sm:flex-grow">
        <a @click="newRequest"
          class="no-underline block mt-4 sm:inline-block sm:mt-0 mr-4 text-white
          cursor-pointer">
          Ny bestilling
        </a>
      </div>
      <div class="text-sm sm:flex-grow">
        <a @click="dummyClick"
          class="no-underline block mt-4 sm:inline-block sm:mt-0 mr-4 text-white
          cursor-pointer">
          Mine bestillinger
        </a>
      </div>
      <div>
        <a @click="logout"
          id="onlyHover"
          class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded
                text-white border-white hover:border-transparent
                hover:text-blue cursor-pointer hover:bg-white mt-4 sm:mt-0"
        >
        Logg ut
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import fb from 'firebase';

export default {
  name: 'Menu',
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    dummyClick() {
      console.log('sumthing clicked');
    },
    toAllRequests() {
      this.$router.push('/all-requests');
    },
    newRequest() {
      this.$router.push('/create-request');
    },
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('SET_CURRENT_USER', null);
          this.$router.push('/login');
        })
        .catch((error) => {
          console.log(`something went wrong ${error.message}`);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#asd{
  background-color: #0060A3;
}
#onlyHover:hover{
  color: #0060A3;
}
</style>
