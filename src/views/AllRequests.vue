<template>
  <section>
    <section>
      <LogoutButton />
    </section>
    <section>
      <Request />
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
};
</script>

<style lang="scss" scoped></style>
