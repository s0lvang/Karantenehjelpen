<template>
  <div class="container">
    <div class="adress">
      <h4>Leveringsadresse:</h4>
      <TextInput labelText="" placeholderText="Kongens slott 1"/>
    </div>
    <div v-if="this.items.length >= 1" class="items">
      <Item @updateItem="addItem" :nrOfItems="items"
            @addItem="addItem"
            @deleteItem="deleteItem"
            @decrementCount="decrementItemCount"
            @incrementCount="incrementItemCount"
            @updateName="updateItemName"
      />
    </div>
    <Button btnText="Ny vare" :btnDisabled="false" @btnClicked="renderNewItem"/>
    <Button btnText="Gå til oppsummering" :btnDisabled="false" @btnClicked="toSummary"/>
    {{this.items}}
  </div>
</template>

<script>
import Button from '@/components/shared/Button.vue';
import TextInput from '@/components/shared/TextInput.vue';
import Item from '@/components/shared/Item.vue';

export default {
  name: 'CreateRequest',
  components: {
    TextInput,
    Item,
    Button,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1);
    },
    addItem(index) {
      this.items[index].added = true;
    },
    renderNewItem() {
      this.items.push({
        itemName: '',
        count: 1,
        added: false,
      });
    },
    updateItemName(input, index) {
      this.items[index].itemName = input;
    },
    incrementItemCount(index) {
      this.items[index].count += 1;
    },
    decrementItemCount(index) {
      this.items[index].count -= 1;
    },
    toSummary() {
      console.log('to summary');
    },
  },
};
</script>

<style lang="scss" scoped>


.container{
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.adress{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.items {
  display: flex;
  justify-content: space-evenly;
}
</style>
