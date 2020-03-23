<template>
  <section>
    <DetailedRequest :request="getRequest" />
    <div class="buttons">
      <Button
        v-if="userOwnsRequest && !this.getRequest.delivered"
        btnText="Endre"
        :btnDisabled="false"
        @btnClicked="goToEdit"
      />
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
        v-if="
          (!userOwnsRequest && !requestIsTaken) ||
            (userIsAssigned && !this.getRequest.delivered)
        "
        :btnText="getAssignedButtonText"
        :btnDisabled="false"
        @btnClicked="connectUserToRequest"
      />
      <Button
        btnText="Jeg har levert ordren"
        v-if="userIsAssigned && !getRequest.delivered"
        :btnDisabled="userIsNotifiedAboutCompletedOrder"
        @btnClicked="notifyUserThatOrderIsComplete"
      />
      <p v-if="userIsAssigned && !this.getRequest.delivered" class>
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
import sms from "@/services/sms";
import { updateRequest, deleteRequest } from "@/services/firebase";

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
    goToEdit() {
      this.$router.push(`/edit/${this.getRequest.id}`);
    },
    async notifyUserThatOrderIsComplete() {
      try {
        await this.$dialog.confirm(
          "Dette vil sende en purremelding til kunden, er du sikker på at du vil sende den?"
        );

        sms(
          this.getRequest.phoneNumber,
          `${
            this.$store.getters.name
          } påstår å ha levert din ordre på: \n\n${printItemNames(
            this.getRequest.items
          )}\n\nHvis dette stemmer, vennligst marker ordren som fullført på https://karantenehjelpen.no/request/${
            this.getRequest.id
          }.`
        );
        this.userIsNotifiedAboutCompletedOrder = true;
        alert(
          "Kunden har blitt varslet om at du har levert varene. Vennligst tillat opptil en halvtime før kunden har markert oppdraget som utført."
        );
      } catch (err) {
        console.info("Bruker ville ikke varsle mottaker.");
      } // user declined
    },
    markAsDelivered() {
      updateRequest(
        this.$store.getters.id,
        this.$route.params.id,
        { delivered: !this.getRequest.delivered },
        () => this.$router.push("/my-requests")
      );
    },
    async deleteRequest() {
      try {
        await this.$dialog.confirm(
          "Er du sikker på at du vil slette bestillingen"
        );
        deleteRequest(this.$store.getters.id, this.$route.params.id, () =>
          this.$router.push("/my-requests")
        );
      } catch (err) {
        console.info("Bruker ville ikke slette annonse.");
      }
    },
    connectUserToRequest() {
      updateRequest(
        this.getRequest.uid,
        this.$route.params.id,
        {
          connectedUser: !this.requestIsTaken
            ? {
                name: this.$store.getters.name,
                email: this.$store.getters.email,
                phoneNumber: this.$store.getters.phoneNumber
              }
            : null
        },
        () => {
          const requestBody = `${
            this.getRequest.items.length > 0
              ? printItemNames(this.getRequest.items)
              : this.getRequest.otherNeed
          }${this.getRequest.items.length > 0 &&
            `\n\nog\n\n${this.getRequest.otherNeed}`}`;

          sms(
            this.getRequest.phoneNumber,
            this.requestIsTaken
              ? `${this.$store.getters.name} har tatt ditt oppdrag på: 

${requestBody}

Du kan nå din lille hjelper på ${this.$store.getters.phoneNumber ||
                  this.$store.getters.email}.`
              : `${this.$store.getters.name} har sagt fra seg ditt oppdrag på: 

${requestBody}`
          );
        }
      );
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
