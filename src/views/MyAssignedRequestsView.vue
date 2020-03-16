<template>
  <Requests
    :requests="getMyRequests"
    firstHeaderText="Mine Oppdrag"
    secondHeaderText="Mine Leverte Oppdrag"
  />
</template>

<script>
import Requests from '@/components/Requests.vue';

export default {
  name: 'MyAssignedRequests',
  components: {
    Requests,
  },

  computed: {
    getMyRequests() {
      return this.$store.getters.requests.filter(
        (request) => request.connectedUser
          && request.connectedUser.email === this.$store.getters.email,
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
