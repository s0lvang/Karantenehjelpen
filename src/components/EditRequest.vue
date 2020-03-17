<template>
  <div>
    <div v-if="!resolvedValue">
      Du kan ikke endre andres bestillinger
    </div>
    <div v-if="resolvedValue">
      <div class="pl-6 mt-5">
        <AddressInput :existing="this.address.place_name_no" inEdit="true" />
        <BigTextInput
          labelText="Ankomstbeskrivelse"
          placeholderText="F.eks: I smuget bak rammeverkstedet"
          @change="updateArrivalDescription"
          :existing="arrivalDesc"
          class="pr-5"
        />
        <NumberInput
          labelText="Telefonummer"
          placeholderText="Telefonnummer"
          @emitNumberInput="updatePhoneNumber"
          :existing="phoneNr"
        />
        <TextInput
          labelText="Betalingsløsing"
          placeholderText="Vipps"
          @emitInputText="updatePaymentSolution"
          :existing="paymentSolution"
          class="mt-2"
        />
      </div>
      <div v-if="this.items.length >= 1" class="items">
        <Item
          @updateItem="addItem"
          :nrOfItems="items"
          @addItem="addItem"
          @deleteItem="deleteItem"
          @decrementCount="decrementItemCount"
          @incrementCount="incrementItemCount"
          @updateName="updateItemName"
          class="pr-5 pl-5"
        />
      </div>
      <Button
        btnText="Ny vare"
        :btnDisabled="false"
        @btnClicked="renderNewItem"
      />
      <div class="flex justify-center">
        <p v-if="errorMsg">Du må legge til alle varene!</p>
        <p v-if="addressError">Du må legge til en adresse!</p>
        <p v-if="zeroItemsError">Du må legge til minst en vare!</p>
        <p v-if="phoneNumberError">Du må legge til en Telefonummer!</p>
        <p v-if="itemNameError">Varen må ha et navn!</p>
        <p v-if="paymentSolutionError">Du må legge til en betalingsløsing!</p>
      </div>
      <Button
        btnText="Gå til oppsummering"
        :btnDisabled="false"
        @btnClicked="toSummary"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Button from "@/components/shared/Button.vue";
import TextInput from "@/components/shared/TextInput.vue";
import BigTextInput from "@/components/shared/BigTextInput.vue";
import NumberInput from "@/components/shared/NumberInput.vue";
import Item from "@/components/shared/Item.vue";
import AddressInput from "@/components/AddressInput.vue";

export default {
  name: "EditRequestView",
  components: {
    TextInput,
    Item,
    Button,
    BigTextInput,
    NumberInput,
    AddressInput
  },
  data() {
    return {
      errorMsg: false,
      addressError: false,
      phoneNumberError: false,
      zeroItemsError: false,
      itemNameError: false,
      paymentSolutionError: false,
      items: [],
      address: {},
      phoneNr: "",
      arrivalDesc: "",
      paymentSolution: "",
      id: ""
    };
  },
  methods: {
    getRequest() {
      return new Promise((resolve, reject) => {
        resolve(
          this.$store.getters.requests.find(
            request => request.id === this.$route.params.id
          )
        );
      });
    },
    updateAddress(event) {
      const { value } = event.target;
      this.addressError = false;
      this.address = value;
    },
    updatePhoneNumber(event) {
      const { value } = event.target;
      this.phoneNumberError = false;
      this.phoneNr = value;
    },
    updateArrivalDescription(value) {
      this.arrivalDesc = value;
    },
    updatePaymentSolution(event) {
      const { value } = event.target;
      this.paymentSolutionError = false;
      this.paymentSolution = value;
    },
    deleteItem(index) {
      this.items.splice(index, 1);
      this.errorMsg = false;
    },
    addItem(index) {
      if (this.items[index].itemName.length > 0) {
        this.items[index].added = true;
        this.errorMsg = false;
      } else {
        this.itemNameError = true;
      }
    },
    renderNewItem() {
      this.items.push({
        itemName: "",
        count: 1,
        added: false
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
      const itemsMapped = this.items.map(item => item.added);
      if (this.paymentSolution.length <= 0) {
        this.paymentSolutionError = true;
        return;
      }
      if (itemsMapped.length > 0 && itemsMapped.every(Boolean)) {
        const localAddress = this.getAddress ? this.getAddress : this.address;
        if (
          localAddress.place_name_no !== undefined &&
          localAddress.place_name_no.length > 1
        ) {
          this.$store.dispatch("SET_ADDRESS", this.address);
          this.$store.dispatch("SET_ITEMS", this.items);
          this.$store.dispatch("SET_PHONE_NUMBER", this.phoneNr);
          this.$store.dispatch("SET_ARRIVAL_DESCRIPTION", this.arrivalDesc);
          this.$store.dispatch("SET_PAYMENT_SOLUTION", this.paymentSolution);
          this.$emit("toSummary");
        } else {
          this.addressError = true;
        }
      } else if (!itemsMapped.every(Boolean)) {
        this.errorMsg = true;
      } else {
        this.zeroItemsError = true;
      }
    }
  },
  asyncComputed: {
    async resolvedValue() {
      const x = await this.getRequest();
      this.id = x.id;
      this.items = x.items;
      this.address = x.address;
      this.phoneNr = x.phoneNumber;
      this.arrivalDesc = x.arrivalDescription;
      this.paymentSolution = x.paymentSolution;
      return x.email === this.$store.getters.email;
    }
  }
};
</script>

<style></style>
