<template>
  <section class="p-2">
    <DetailedRequest :request="getRequest" />
  </section>
</template>

<script>
import DetailedRequest from '@/components/DetailedRequest.vue';

export default {
  name: 'RequestView',
  components: {
    DetailedRequest,
  },
  computed: {
    getRequest() {
      return this.$store.getters.requests.find(
        (request) => request.id === this.$route.params.id,
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
