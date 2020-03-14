<template>
  <section>
    <section>
      <LogoutButton />
    </section>
    <section v-for="(request, index) in getRequests" :key="index">
      <Request :request="request"/>
    </section>
  </section>
</template>

<script>
import Request from '@/components/Request.vue';
import LogoutButton from '@/components/LogoutButton.vue';

export default {
  name: 'AllRequests',
  components: {
    Request,
    LogoutButton,
  },
  computed: {
    getRequests() {
      return this.$store.getters.requests;
    },
  },
};
</script>

<style lang="scss" scoped></style>
