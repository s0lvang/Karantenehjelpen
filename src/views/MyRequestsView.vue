<template>
  <section>
    <h3>Mine Bestillinger </h3>
    <section v-for="(request, index) in getNotDelivered" :key="index">
      <Request :request="request" />
    </section>
    <h3>Mine Leverte </h3>
    <section v-for="(request, index) in getDelivered" :key="index">
      <Request :request="request" />
    </section>
  </section>
</template>

<script>
import Request from '@/components/Request.vue';

export default {
  name: 'MyRequests',
  components: {
    Request,
  },
  computed: {
    getMyRequests() {
      return this.$store.getters.requests.filter(
        (request) => request.email === this.$store.getters.email,
      );
    },
    getDelivered() {
      return this.getMyRequests.filter((request) => request.delivered);
    },
    getNotDelivered() {
      return this.getMyRequests.filter((request) => !request.delivered);
    },
  },
};
</script>

<style lang="scss" scoped></style>
