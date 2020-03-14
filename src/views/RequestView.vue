<template>
  <section>
    <section>
      <LogoutButton />
    </section>
    <DetailedRequest :request="getRequest" />
  </section>
</template>

<script>
import LogoutButton from '@/components/LogoutButton.vue';
import DetailedRequest from '@/components/DetailedRequest.vue';

export default {
  name: 'RequestView',
  components: {
    LogoutButton,
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
