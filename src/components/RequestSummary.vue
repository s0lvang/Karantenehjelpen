<template>
  <div>
    <h2> Din Bestilling </h2>
    <DetailedRequest :request="getRequest" />
    <Button
      btnText="Send Forespørsel"
      :btnDisabled="false"
      @btnClicked="createRequest"
    />
    <Button btnText="Gå tilbake" :btnDisabled="false" @btnClicked="goBack" />
  </div>
</template>

<script>
import Button from '@/components/shared/Button.vue';
import DetailedRequest from '@/components/DetailedRequest.vue';

export default {
  name: 'RequestSummary',
  components: {
    Button,
    DetailedRequest,
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
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
