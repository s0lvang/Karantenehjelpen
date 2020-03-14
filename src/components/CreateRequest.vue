<template>
  <div class="container mx-auto">
    <h1 class="text-3xl pt-4 pl-4">Ny bestilling</h1>
    <div class="pl-6 mt-10">
      <TextInput
        labelText="Leveringsadresse"
        placeholderText="Kongens slott 1"
        @emitInputText="updateAddress"
        :existing="getAddress"
      />
      <BigTextInput
        labelText="Ankomstbeskrivelse"
        placeholderText="F.eks: I smuget bak rammeverkstedet"
        @change="updateArrivalDescription"
        :existing="existingArrivalDescription"
        class="pr-10"
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
    <div class="flex justify-center">
      <p v-if="errorMsg">Du må legge til alle varene!</p>
      <p v-if="addressError">Du må legge til en adresse!</p>
      <p v-if="zeroItemsError">Du må legge til minst en vare!</p>
      <p v-if="itemNameError">Varen må ha et navn!</p>
    </div>
    <Button btnText="Gå til oppsummering" :btnDisabled="false" @btnClicked="toSummary"/>
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
      errorMsg: false,
      addressError: false,
      zeroItemsError: false,
      itemNameError: false,
    };
  },
  methods: {
    updateAddress(event) {
      const { value } = event.target;
      this.addressError = false;
      this.$store.dispatch('SET_ADDRESS', value);
    },
    updateArrivalDescription(value) {
      this.$store.dispatch('SET_ARRIVAL_DESCRIPTION', value);
    },
    deleteItem(index) {
      this.items.splice(index, 1);
      this.$store.dispatch('SET_ITEMS', this.items);
      this.errorMsg = false;
    },
    addItem(index) {
      if (this.items[index].itemName.length > 0) {
        this.items[index].added = true;
        this.$store.dispatch('SET_ITEMS', this.items);
        this.errorMsg = false;
      } else {
        this.itemNameError = true;
      }
    },
    renderNewItem() {
      this.items.push({
        itemName: '',
        count: 1,
        added: false,
      });
      this.errorMsg = false;
      this.zeroItemsError = false;
    },
    updateItemName(input, index) {
      this.itemNameError = false;
      this.items[index].itemName = input;
    },
    incrementItemCount(index) {
      this.items[index].count += 1;
    },
    decrementItemCount(index) {
      if (this.items[index].count > 1) {
        this.items[index].count -= 1;
      }
    },
    toSummary() {
      const itemsMapped = this.items.map((item) => item.added);
      if (itemsMapped.length > 0 && itemsMapped.every(Boolean)) {
        if (this.getAddress.length > 0) {
          this.$emit('toSummary');
        } else {
          this.addressError = true;
        }
      } else if (!itemsMapped.every(Boolean)) {
        this.errorMsg = true;
      } else {
        this.zeroItemsError = true;
      }
    },
  },
  computed: {
    existingArrivalDescription() {
      return this.$store.getters.arrivalDescription;
    },
    getAddress() {
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
