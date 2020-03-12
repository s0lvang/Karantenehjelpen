<template>
  <div>
    <Request />
  </div>
</template>

<script lang="ts">
import Request from '@/components/Request.vue';

import Vue from 'vue';

export default Vue.extend({
  name: 'AllRequests',
  components: {
    Request,
  },
});
</script>

<style lang="scss" scoped>

</style>
