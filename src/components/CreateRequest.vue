<template>
  <div class="container">
    <div class="address">
      <TextInput
        labelText="Leveringsadresse"
        placeholderText="Kongens slott 1"
        @emitInputText="updateAddress"
        :existing="existingAddress"
      />
      <BigTextInput
        labelText="Ankomstbeskrivelse"
        placeholderText="F.eks: I smuget bak rammeverkstedet"
        @change="updateArrivalDescription"
        :existing="existingArrivalDescription"
      />
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
import BigTextInput from '@/components/shared/BigTextInput.vue';
import Item from '@/components/shared/Item.vue';

export default {
  name: 'CreateRequest',
  components: {
    TextInput,
    Item,
    Button,
    BigTextInput,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    updateAddress(event) {
      const { value } = event.target;
      this.$store.dispatch('SET_ADDRESS', value);
    },
    updateArrivalDescription(value) {
      this.$store.dispatch('SET_ARRIVAL_DESCRIPTION', value);
    },
    deleteItem(index) {
      this.items.splice(index, 1);
      this.$store.dispatch('SET_ITEMS', this.items);
    },
    addItem(index) {
      this.items[index].added = true;
      this.$store.dispatch('SET_ITEMS', this.items);
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
      this.$emit('toSummary');
    },
  },
  computed: {
    existingArrivalDescription() {
      return this.$store.getters.arrivalDescription;
    },
    existingAddress() {
      return this.$store.getters.address;
    },
    getItems() {
      return this.$store.getters.items;
    },
  },
  mounted() {
    this.items = this.getItems;
  },
};
</script>

<style lang="scss" scoped>

.container{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.items {
  display: flex;
  justify-content: space-evenly;
}
</style>
