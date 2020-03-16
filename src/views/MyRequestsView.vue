<template>
  <Requests
    :requests="getMyRequests"
    firstHeaderText="Mine Bestillinger"
    secondHeaderText="Mine Leverte"
  />
</template>

<script>
import Requests from "@/components/Requests.vue";

export default {
  name: "MyRequests",
  components: {
    Requests
  },

  computed: {
    getMyRequests() {
      return this.$store.getters.requests.filter(
        request => request.email === this.$store.getters.email
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
