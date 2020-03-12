<template>
  <div>
    <CreateRequest />
  </div>
</template>

<script lang="ts">
import CreateRequest from '@/components/CreateRequest.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'CreateRequestView',
  components: {
    CreateRequest,
  },
});
</script>

<style lang="scss" scoped>

</style>
