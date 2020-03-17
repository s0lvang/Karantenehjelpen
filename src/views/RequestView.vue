<template>
  <section>
    <DetailedRequest :request="getRequest" />
    <div class="buttons">
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
        v-if="(!userOwnsRequest && !requestIsTaken) || userIsAssigned"
        :btnText="getAssignedButtonText"
        :btnDisabled="false"
        @btnClicked="connectUserToRequest"
      />
      <Button
        btnText="Jeg har levert ordren"
        v-if="userIsAssigned"
        :btnDisabled="userIsNotifiedAboutCompletedOrder"
        @btnClicked="notifyUserThatOrderIsComplete"
      />
      <p v-if="userIsAssigned" class>
        Du har tatt dette oppdraget, det betyr at ingen andre kan se det lengre.
        Hvis du ikke har mulighet til å gjennomføre, gi det fra deg.
      </p>
      <section v-if="userOwnsRequest && requestIsTaken">
        <p>
          <b>{{ getRequest.connectedUser.name }}</b> har tatt oppdraget ditt.
        </p>
        <p>
          Du kan nå denne personen på
          <b>{{ getRequest.connectedUser.phoneNumber }}</b>
        </p>
        <Button
          btnText="Fjern brukeren fra oppdraget"
          :btnDisabled="false"
          isDanger="true"
          @btnClicked="connectUserToRequest"
        />
      </section>
    </div>
  </section>
</template>

<script>
import DetailedRequest from "@/components/DetailedRequest.vue";
import Button from "@/components/shared/Button.vue";
import fb from "@/firebaseConfig.js";
import sms from "@/services/sms";

const printItemNames = items =>
  items.map(i => `${i.count}x ${i.itemName}`).join("\n");

export default {
  name: "RequestView",
  components: {
    DetailedRequest,
    Button
  },
  data() {
    return {
      userIsNotifiedAboutCompletedOrder: false
    };
  },
  computed: {
    getRequest() {
      return this.$store.getters.requests.find(
        request => request.id === this.$route.params.id
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
        this.getRequest.connectedUser &&
        this.getRequest.connectedUser.email === this.$store.getters.email
      );
    },
    getDeliveredButtonText() {
      return !this.getRequest.delivered
        ? "Marker som levert"
        : "Marker som ikke levert";
    },
    getAssignedButtonText() {
      return !this.userIsAssigned ? "Ta oppdraget" : "Gi fra deg oppdraget";
    }
  },
  methods: {
    notifyUserThatOrderIsComplete() {
      sms(
        this.getRequest.phoneNumber,
        `${
          this.$store.getters.name
        } påstår å ha levert din ordre på: \n\n${printItemNames(
          this.getRequest.items
        )}\n\nHvis dette stemmer, vennligst marker ordren som fullført på https://karantenehjelpen.no/my-requests.`
      );
      this.userIsNotifiedAboutCompletedOrder = true;
      alert(
        "Kunden har blitt varslet om at du har levert varene. Vennligst tillat opptil en halvtime før kunden har markert oppdraget som utført."
      );
    },
    markAsDelivered() {
      fb.usersCollection
        .doc(this.$store.getters.id)
        .collection("requests")
        .doc(this.$route.params.id)
        .update({
          delivered: !this.getRequest.delivered
        })
        .then(() => this.$router.push("/my-requests"))
        .catch(error => console.log(error));
    },
    deleteRequest() {
      fb.usersCollection
        .doc(this.$store.getters.id)
        .collection("requests")
        .doc(this.$route.params.id)
        .delete()
        .then(() => this.$router.push("/my-requests"))
        .catch(error => console.log(error));
    },
    connectUserToRequest() {
      fb.usersCollection
        .doc(this.getRequest.uid)
        .collection("requests")
        .doc(this.$route.params.id)
        .update(
          !this.requestIsTaken
            ? {
                connectedUser: {
                  name: this.$store.getters.name,
                  email: this.$store.getters.email,
                  phoneNumber: this.$store.getters.phoneNumber
                }
              }
            : { connectedUser: null }
        )
        .then(() => {
          sms(
            this.getRequest.phoneNumber,
            this.requestIsTaken
              ? `${
                  this.$store.getters.name
                } har tatt din ordre på: \n\n${printItemNames(
                  this.getRequest.items
                )}\n\nDu kan nå din lille hjelper på ${this.$store.getters
                  .phoneNumber || this.$store.getters.email}.`
              : `${
                  this.$store.getters.name
                } har sagt fra seg din ordre på: \n\n${printItemNames(
                  this.getRequest.items
                )}`
          );
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  margin-top: 2rem;

  & > * + * {
    margin-left: 1rem;
  }
}
</style>
