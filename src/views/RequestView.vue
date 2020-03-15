<template>
  <section>
    <section>
      <DetailedRequest :request="getRequest" />
    </section>
    <Button
      v-if="userOwnsRequest"
      btnText="Marker som levert"
      :btnDisabled="false"
      @btnClicked="markAsDelivered"
    />
    <Button
      v-if="userOwnsRequest"
      btnText="Slett bestilling"
      isDanger="true"
      :btnDisabled="false"
      @btnClicked="deleteRequest"
    />
  </section>
</template>

<script>
import DetailedRequest from '@/components/DetailedRequest.vue';
import Button from '@/components/shared/Button.vue';
import fb from '@/firebaseConfig.js';

export default {
  name: 'RequestView',
  components: {
    DetailedRequest,
    Button,
  },
  computed: {
    getRequest() {
      return this.$store.getters.requests.find(
        (request) => request.id === this.$route.params.id,
      );
    },
    userOwnsRequest() {
      return this.getRequest.email === this.$store.getters.email;
    },
  },
  methods: {
    markAsDelivered() {
      return this.$store.getters.requests.find(
        (request) => request.id === this.$route.params.id,
      );
    },
    deleteRequest() {
      fb.requestsCollection
        .doc(this.$route.params.id)
        .delete()
        .then(() => this.$router.push('/my-requests'))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped></style>
