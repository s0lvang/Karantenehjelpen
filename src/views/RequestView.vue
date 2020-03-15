<template>
  <section>
    <section class="p-2">
      <DetailedRequest :request="getRequest" />
    </section>
    <Button
      v-if="userOwnsRequest"
      :btnText="getButtonText"
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
    getButtonText() {
      return !this.getRequest.delivered
        ? 'Marker som levert'
        : 'Marker som ikke levert';
    },
    userOwnsRequest() {
      return this.getRequest.email === this.$store.getters.email;
    },
  },
  methods: {
    markAsDelivered() {
      fb.usersCollection
        .doc(this.$store.getters.id)
        .collection('requests')
        .doc(this.$route.params.id)
        .update({
          delivered: !this.getRequest.delivered,
        })
        .then(() => this.$router.push('/my-requests'))
        .catch((error) => console.log(error));
    },

    deleteRequest() {
      fb.usersCollection
        .doc(this.$store.getters.id)
        .collection('requests')
        .doc(this.$route.params.id)
        .delete()
        .then(() => this.$router.push('/my-requests'))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped></style>
