<template>
  <section>
    <section>
      <LogoutButton />
    </section>
      <Request :request="getRequest" />
  </section>
</template>

<script>
import Request from '@/components/Request.vue';
import LogoutButton from '@/components/LogoutButton.vue';

export default {
  name: 'RequestView',
  components: {
    Request,
    LogoutButton,
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
