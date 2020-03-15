<template>
  <section>
    <section class="p-2">
      <DetailedRequest :request="getRequest" />
    </section>
    <Button
      v-if="userOwnsRequest"
      :btnText="getDeliveredButtonText"
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
    <Button
      v-if="(!userOwnsRequest && !requestIsTaken) || userIsAssigned "
      :btnText="getAssignedButtonText"
      :btnDisabled="false"
      @btnClicked="connectUserToRequest"
    />
    <section v-if="userOwnsRequest && requestIsTaken">
      <p>{{getRequest.connectedUser.name}} har tatt oppdraget ditt. </p>
      <p> Du kan nå denne personen på {{getRequest.connectedUser.email}} </p>
      <Button
      btnText="Fjern Brukeren fra oppdraget"
      :btnDisabled="false"
      isDanger="true"
      @btnClicked="connectUserToRequest"
    />
    </section>
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
    requestIsTaken() {
      return this.getRequest.connectedUser != null;
    },
    userIsAssigned() {
      return (
        this.getRequest.connectedUser
        && this.getRequest.connectedUser.email === this.$store.getters.email
      );
    },
    getDeliveredButtonText() {
      return !this.getRequest.delivered
        ? 'Marker som levert'
        : 'Marker som ikke levert';
    },
    getAssignedButtonText() {
      return !this.userIsAssigned ? 'Ta oppdraget' : 'Gi fra deg oppdraget';
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
    connectUserToRequest() {
      fb.usersCollection
        .doc(this.getRequest.uid)
        .collection('requests')
        .doc(this.$route.params.id)
        .update(
          !this.requestIsTaken
            ? {
              connectedUser: {
                name: this.$store.getters.name,
                email: this.$store.getters.email,
              },
            }
            : { connectedUser: null },
        )

        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped></style>
