<template>
  <section class="container mx-auto">
    <h3 class="text-3xl pt-4 pl-4">{{firstHeaderText}}</h3>
    <section v-for="request  in getNotDelivered" :key="request.id" class="p-3">
      <Request :request="request" />
    </section>
    <h3 class="text-3xl pt-4 pl-4">{{secondHeaderText}}</h3>
    <section v-for="request in getDelivered" :key="request.id" class="p-3">
      <Request :request="request" />
    </section>
  </section>
</template>

<script>
import Request from '@/components/Request.vue';

export default {
  name: 'Requests',
  components: {
    Request,
  },
  props: {
    requests: {
      type: Array,
      required: true,
    },
    firstHeaderText: {
      type: String,
      required: true,
    },
    secondHeaderText: {
      type: String,
      required: true,
    },
  },
  computed: {
    getDelivered() {
      return this.requests.filter((request) => request.delivered);
    },
    getNotDelivered() {
      return this.requests.filter((request) => !request.delivered);
    },
  },
};
</script>

<style lang="scss" scoped></style>
