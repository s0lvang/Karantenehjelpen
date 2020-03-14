<template>
  <div>
    <Menu @burgerClick="burgerClicked" :clicked="this.clicked"/>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue';

export default {
  name: 'MenuView',
  components: {
    Menu,
  },
  data() {
    return {
      clicked: false,
    };
  },
  methods: {
    burgerClicked() {
      console.log('clickeee');
      this.clicked = this.clicked ? this.clicked = false : true;
    },
  },
};
</script>

<style>

</style>
