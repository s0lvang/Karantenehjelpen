<template>
  <div class="container mx-auto ">
    <h2 class="text-3xl text-center"> Din Bestilling </h2>
    <DetailedRequest :request="getRequest" />
    <Spinner :showSpinner="showSpinner"/>
    <div v-if="!showSpinner">
      <Button
        btnText="Send Forespørsel"
        :btnDisabled="false"
        @btnClicked="createRequest"
      />
      <Button btnText="Gå tilbake" :btnDisabled="false" @btnClicked="goBack" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/shared/Button.vue';
import DetailedRequest from '@/components/DetailedRequest.vue';
import Spinner from '@/components/shared/Spinner.vue';

export default {
  name: 'RequestSummary',
  components: {
    Button,
    DetailedRequest,
    Spinner,
  },
  props: {
    showSpinner: Boolean,
  },
  methods: {
    goBack() {
      this.$emit('goBack');
    },
    createRequest() {
      this.$emit('createRequest', this.getRequest);
    },
  },
  computed: {
    getRequest() {
      return {
        email: this.$store.getters.email,
        name: this.$store.getters.name,
        phoneNumber: this.$store.getters.phoneNumber,
        address: this.$store.getters.address,
        arrivalDescription: this.$store.getters.arrivalDescription,
        items: this.$store.getters.items,
        uid: this.$store.getters.id,
        paymentSolution: this.$store.getters.paymentSolution,
        delivered: false,
        connectedUser: null,
      };
    },
  },
};
</script>
