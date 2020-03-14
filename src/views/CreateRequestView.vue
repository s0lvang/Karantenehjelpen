<template>
  <div class="container mx-auto">
    <template v-if="step === 1">
      <CreateRequest @toSummary="toSummary" />
    </template>
    <template v-if="step === 2">
      <RequestSummary @goBack="goBack" @createRequest="createRequest" />
    </template>
  </div>
</template>

<script>
import CreateRequest from '@/components/CreateRequest.vue';
import RequestSummary from '@/components/RequestSummary.vue';
import fb from '@/firebaseConfig.js';


export default {
  name: 'CreateRequestView',
  components: {
    CreateRequest,
    RequestSummary,
  },
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    createRequest() {
      fb.requestsCollection
        .add({
          createdOn: new Date(),
          email: this.$store.getters.email,
          name: this.$store.getters.name,
          id: this.$store.getters.id,
          phoneNumber: this.$store.getters.phoneNumber,
          address: this.$store.getters.address,
          items: this.$store.getters.items,
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toSummary() {
      this.step += 1;
    },
    goBack() {
      this.step -= 1;
    },
  },
};
</script>
