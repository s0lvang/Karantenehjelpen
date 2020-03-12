<template>
  <div class="container">
    <div class="adress">
      <h4>Leveringsadresse:</h4>
      <TextInput labelText="Adresse" placeholderText="Kongens slott 1"/>
    </div>
    <div v-for="n in val" :key="n">
      <Item @deleteItem="deleteItem(n)"/>
    </div>
  </div>
</template>

<script lang="ts">
import TextInput from '@/components/shared/TextInput.vue';
import Item from '@/components/shared/Item.vue';

import Vue from 'vue';

export default Vue.extend({
  name: 'CreateRequest',
  components: {
    TextInput,
    Item,
  },
  data() {
    return {
      val: 1,
    };
  },
  methods: {
    deleteItem(n: number) {
      console.log(n);
    },
  },
});
</script>

<style lang="scss" scoped>
.container{
  border: 1px solid black;
  display: flex;
  flex-direction: column;
}
.adress{
  display: flex;
}
</style>
