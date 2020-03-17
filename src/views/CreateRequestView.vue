<template>
  <div class="container mx-auto">
    <template v-if="step === 1">
      <EditRequest @toSummary="toSummary" />
    </template>
    <template v-if="step === 2">
      <RequestSummary
        @goBack="goBack"
        @createRequest="createRequest"
        :showSpinner="showSpinner"
      />
    </template>
  </div>
</template>

<script>
import EditRequest from "@/components/EditRequest.vue";
import RequestSummary from "@/components/RequestSummary.vue";
import fb from "@/firebaseConfig.js";

export default {
  name: "CreateRequestView",
  components: {
    EditRequest,
    RequestSummary
  },
  data() {
    return {
      step: 1,
      showSpinner: false
    };
  },
  methods: {
    createRequest(request) {
      this.showSpinner = true;
      fb.usersCollection
        .doc(this.$store.getters.id)
        .collection("requests")
        .add({
          createdOn: new Date(),
          ...request
        })
        .then(() => {
          this.$store.dispatch("SET_ADDRESS", "");
          this.$store.dispatch("SET_ARRIVAL_DESCRIPTION", "");
          this.$store.dispatch("SET_PHONE_NUMBER", "");
          this.$store.dispatch("SET_PAYMENT_SOLUTION", "");
          this.$store.dispatch("SET_ITEMS", []);
          this.showSpinner = false;
          this.$router.push("/all-requests");
        })
        .catch(err => {
          console.log(err);
        });
    },
    toSummary() {
      this.step += 1;
    },
    goBack() {
      this.step -= 1;
    }
  }
};
</script>
