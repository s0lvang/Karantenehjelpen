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
    createRequest(request) {
      fb.requestsCollection
        .add({
          createdOn: new Date(),
          ...request,
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
