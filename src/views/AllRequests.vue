<template>
  <section class="container mx-auto">
    <p class="text-3xl pt-4 pl-4">Tilgjengelige oppdrag</p>
    <section v-for="request in getRequests" :key="request.id" class="p-3">
      <Request :request="request" />
    </section>
  </section>
</template>

<script>
import Request from "@/components/Request.vue";

export default {
  name: "MyRequests",
  components: {
    Request
  },
  computed: {
    getRequests() {
      // All requests that are available or the ones owned by yourself.
      return this.$store.getters.requests
        .filter(request => !request.delivered)
        .filter(
          request =>
            request.connectedUser === null ||
            this.$store.getters.email === request.connectedUser.email
        );
    }
  }
};
</script>

<style lang="scss" scoped></style>
