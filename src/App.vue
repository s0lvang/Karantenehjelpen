<template>
  <div id="app">
    <template v-if="getUser">
      <MenuView />
    </template>
    <router-view/>
  </div>
</template>

<script>
import MenuView from '@/views/MenuView.vue';

export default {
  components: {
    MenuView,
  },
  computed: {
    getUser() {
      return this.$store.getters.currentUser;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
}
</style>
