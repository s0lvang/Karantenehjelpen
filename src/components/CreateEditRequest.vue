<template>
  <div>
    <Spinner :showSpinner="showSpinner" />
    <div v-if="!showSpinner">
      <div class="pl-6 mt-5">
        <AddressInput
          :existing="this.address.place_name_no"
          :inEdit="checkEditForClass"
        />
        <BigTextInput
          labelText="Ankomstbeskrivelse"
          placeholderText="F.eks: I smuget bak rammeverkstedet"
          @change="updateArrivalDescription"
          :existing="arrivalDesc"
          class="pr-5"
        />
        <NumberInput
          labelText="Telefonummer (uten landskode)"
          placeholderText="98765432"
          @emitNumberInput="updatePhoneNumber"
          :existing="phoneNr"
        />
        <label class="payment-solution-label" for="payment-solution"
          >Betalingsmetode</label
        >
        <v-select
          id="payment-solution"
          name="payment-solution"
          :options="['Vipps', 'Kontant', 'Bankoverføring']"
          :value="paymentSolution"
          @input="updatePaymentSolution"
        />
      </div>
      <div v-if="this.items.length >= 1" class="items">
        <Items
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
      {{ this.address }}<br />
      {{ this.arrivalDesc }}<br />
      {{ this.phoneNr }}<br />
      {{ this.paymentSolution }}
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
import BigTextInput from "@/components/shared/BigTextInput.vue";
import NumberInput from "@/components/shared/NumberInput.vue";
import Items from "@/components/shared/Items.vue";
import AddressInput from "@/components/AddressInput.vue";
import Spinner from "@/components/shared/Spinner.vue";

export default {
  name: "EditRequestView",
  components: {
    Items,
    Button,
    BigTextInput,
    NumberInput,
    AddressInput,
    Spinner
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
      id: "",
      showSpinner: false
    };
  },
  methods: {
    updateAddress(event) {
      const { value } = event.target;
      this.addressError = false;
      this.address = value;
    },
    updatePhoneNumber(event) {
      const { value } = event.target;
      this.phoneNumberError = false;
      this.phoneNr = value.replace(/\+47/g, "").replace(/ /g, "");
    },
    updateArrivalDescription(value) {
      this.arrivalDesc = value;
    },
    updatePaymentSolution(value) {
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
        const localAddress = this.getAddress || this.address;
        if (
          localAddress.place_name_no !== undefined &&
          localAddress.place_name_no.length > 1
        ) {
          this.$store.dispatch("SET_ADDRESS", localAddress);
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
    // getRequest() {
    //   console.log("skjer dette først?");
    // },
    getContent: {
      get() {
        // const x = this.$store.getters.requests.find(
        //   request => request.id === this.$route.params.id
        // );
        console.log("oops");
        return new Promise((resolve, reject) => {
          setTimeout(
            () =>
              resolve(
                this.$store.getters.requests.find(
                  request => request.id === this.$route.params.id
                )
              ),
            1000
          );
        });
      },
      default: "no"
      // default: "Loading"
    },
    async resolvedValue() {
      this.showSpinner = true;
      console.log("kallt");
      if (!this.checkEdit) {
        this.showSpinner = false;
        this.items = this.getItems;
        this.address = this.getAddress;
        this.phoneNr = this.getPhoneNumber;
        this.arrivalDesc = this.getArrivalDescription;
        this.paymentSolution = this.getPaymentSolution;
        return false;
      }
      const x = await this.getContent;
      if (x === "no") {
        return false;
      }
      this.showSpinner = false;
      this.id = x.id;
      this.items = x.items;
      this.address = x.address;
      this.phoneNr = x.phoneNumber;
      this.arrivalDesc = x.arrivalDescription;
      this.paymentSolution = x.paymentSolution;

      return x.email === this.$store.getters.email;
    }
    // get() {
    //   return get(this.$store.getters.currentUser).then(
    //     request => request.id === this.$route.params.id
    //   );
    // return new Promise((resolve, reject) => {
    //   setTimeout(() =>
    //     resolve(
    //       this.$getters.currentUser.find(
    //         request => request.id === this.$route.params.id
    //       ),
    //       1000
    //     )
    //   );
    // });
    // }
  },
  computed: {
    checkEdit() {
      if (this.$route.name === "EditRequest") {
        return true;
      }
      return false;
    },
    checkEditForClass() {
      if (this.$route.name === "EditRequest") {
        return "true";
      }
      return "false";
    },
    getArrivalDescription() {
      return this.$store.getters.arrivalDescription;
    },
    getAddress() {
      return this.$store.getters.address;
    },
    getItems() {
      return this.$store.getters.items;
    },
    getPhoneNumber() {
      return this.$store.getters.phoneNumber;
    },
    getPaymentSolution() {
      return this.$store.getters.paymentSolution;
    }
  }
};
</script>
<style lang="scss" scoped>
.payment-solution-label {
  align-self: flex-start;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: block;
  color: rgb(0, 96, 163);
}
</style>
