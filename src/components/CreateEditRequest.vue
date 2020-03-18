<template>
  <section>
    <template v-if="userOwnsRequest || this.$route.name === 'CreateRequest'">
      <h2>{{ userOwnsRequest ? "Endre bestilling" : "Ny bestilling" }}</h2>
      <AddressInput
        :existing="this.address.place_name_no"
        :inEdit="checkEdit"
      />
      <BigTextInput
        labelText="Ankomstbeskrivelse"
        placeholderText="F.eks: I smuget bak rammeverkstedet"
        @change="updateArrivalDescription"
        :existing="arrivalDesc"
      />
      <PhoneNumberInput
        labelText="Telefonnummer (uten landskode)"
        placeholderText="98765432"
        @emitNumberInput="updatePhoneNumber"
        :existing="phoneNr"
      />
      <label for="payment-solution">Betalingsmetode</label>
      <v-select
        id="payment-solution"
        name="payment-solution"
        :options="['Vipps', 'Kontant', 'Bankoverføring']"
        :value="paymentSolution"
        @input="updatePaymentSolution"
      />
      <Items
        v-if="this.items.length >= 1"
        @updateItem="addItem"
        :nrOfItems="items"
        @addItem="addItem"
        @deleteItem="deleteItem"
        @decrementCount="decrementItemCount"
        @incrementCount="incrementItemCount"
        @updateName="updateItemName"
      />
      <Button
        btnText="Ny vare"
        :btnDisabled="false"
        @btnClicked="renderNewItem"
      />
      <p class="error" v-if="nonAddedItem">Du må legge til alle varene!</p>
      <p class="error" v-if="addressError">Du må legge til en adresse!</p>
      <p class="error" v-if="zeroItemsError">Du må legge til minst en vare!</p>
      <p class="error" v-if="phoneNumberError">
        Du må legge til et telefonnummer!
      </p>
      <p class="error" v-if="itemNameError">Varen må ha et navn!</p>
      <p class="error" v-if="paymentSolutionError">
        Du må legge til en betalingsløsing!
      </p>
      <div>
        <hr />
        <Button
          btnText="Gå til oppsummering"
          :btnDisabled="false"
          @btnClicked="toSummary"
        />
      </div>
    </template>
    <div v-else>
      Du kan ikke endre andres bestillinger!
    </div>
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */
import Button from "@/components/shared/Button.vue";
import BigTextInput from "@/components/shared/BigTextInput.vue";
import PhoneNumberInput from "@/components/shared/PhoneNumberInput.vue";
import Items from "@/components/shared/Items.vue";
import AddressInput from "@/components/AddressInput.vue";

export default {
  name: "EditRequestView",
  components: {
    Items,
    Button,
    BigTextInput,
    PhoneNumberInput,
    AddressInput
  },
  data() {
    return {
      nonAddedItem: false,
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
      showSpinner: false,
      request: {}
    };
  },
  methods: {
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
      this.nonAddedItem = false;
    },
    addItem(index) {
      if (this.items[index].itemName.length > 0) {
        this.items[index].added = true;
        this.nonAddedItem = false;
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
      this.nonAddedItem = false;
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
      const localAddress = this.getAddress;
      if (this.paymentSolution.length <= 0) {
        this.paymentSolutionError = true;
      } else if (!itemsMapped.every(Boolean)) {
        this.nonAddedItem = true;
      } else if (itemsMapped.length === 0) {
        this.zeroItemsError = true;
      } else if (Object.keys(localAddress).length === 0) {
        this.addressError = true;
      } else {
        this.$store.dispatch("SET_ADDRESS", localAddress);
        this.$store.dispatch("SET_ITEMS", this.items);
        this.$store.dispatch("SET_PHONE_NUMBER_INPUT", this.phoneNr);
        this.$store.dispatch("SET_ARRIVAL_DESCRIPTION", this.arrivalDesc);
        this.$store.dispatch("SET_PAYMENT_SOLUTION", this.paymentSolution);
        this.$emit("toSummary");
      }
    },
    populate() {
      if (this.checkEdit) {
        this.showSpinner = false;
        this.id = this.request.id;
        this.items = this.request.items;
        this.address = this.request.address;
        this.phoneNr = this.request.phoneNumber;
        this.arrivalDesc = this.request.arrivalDescription;
        this.paymentSolution = this.request.paymentSolution;
      } else {
        this.items = this.getItems;
        this.address = this.getAddress;
        this.phoneNr = this.getPhoneNumber;
        this.arrivalDesc = this.getArrivalDescription;
        this.paymentSolution = this.getPaymentSolution;
      }
    },
    init() {
      const y = this.$store.getters.requests;
      const o = this.$route.params.id;
      this.request = y.find(request => request.id === o);
      this.populate();
    }
  },
  computed: {
    checkEdit() {
      if (
        this.$route.name === "EditRequest" &&
        this.request.email === this.$store.getters.email
      ) {
        return true;
      }
      return false;
    },
    userOwnsRequest() {
      return this.request && this.request.email === this.$store.getters.email;
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
    },
    checkIfEdit() {
      return this.request.email === this.$store.getters.email;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
section > * + * {
  margin-top: 1rem;
}

.error {
  text-align: center;
  color: $color-danger;
}
</style>
