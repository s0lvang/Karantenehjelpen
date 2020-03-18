<template>
  <section class="wrapper">
    <h2>Min side</h2>
    <section>
      <NumberInput
        labelText="Telefonnummer (uten landskode)"
        placeholderText="98765432"
        @emitNumberInput="updatePhoneNumberInput"
        :existing="phoneNumberInput"
      />
      <Button
        @btnClicked="updatePhoneNumber"
        btnText="Oppdater telefonnummer"
        :btnDisabled="false"
      />
    </section>
    <section>
      <h3>Ønsker du å slette brukeren din?</h3>
      <p>
        Hvis du sletter brukeren din, slettes alle åpne bestillinger, du fjernes
        fra åpne oppdrag og all persondata vi har fått fra deg.
      </p>
      <Button
        @btnClicked="deleteMe"
        btnText="Slett meg"
        isDanger="true"
        :btnDisabled="false"
      />
    </section>
  </section>
</template>

<script>
import Button from "@/components/shared/Button.vue";
import NumberInput from "@/components/shared/NumberInput.vue";
import fb from "@/firebaseConfig.js";
import firebase from "firebase";

export default {
  name: "MyPage",
  components: {
    Button,
    NumberInput
  },
  data() {
    return {
      phoneNumberInput: ""
    };
  },
  computed: {},
  mounted() {
    this.phoneNumberInput =
      this.$store.getters.phoneNumber || this.$store.getters.phoneNumberInput;
  },
  methods: {
    updatePhoneNumberInput(event) {
      const { value } = event.target;
      this.phoneNumberInput = value.replace(/\+47/g, "").replace(/ /g, "");
    },
    updatePhoneNumber() {
      fb.additionalUserInfoCollection
        .doc(this.$store.getters.id)
        .update({ phoneNumber: this.phoneNumberInput });
      this.$store.getters.requests.forEach(request => {
        fb.usersCollection
          .doc(request.uid)
          .collection("requests")
          .doc(request.id)
          .update({
            connectedUser: {
              phoneNumber: this.phoneNumberInput,
              name: this.$store.getters.name
            }
          });
      });
      this.$store.dispatch("SET_CURRENT_USER", {
        ...this.$store.getters.currentUser,
        phoneNumber: this.phoneNumberInput
      });
      this.$dialog.alert("Nummeret ditt er oppdatert!");
    },

    deleteMe() {
      this.$dialog
        .confirm(
          "Dette vil slette brukeren din og alle dine oppdrag er du sikker på at du ønsker å slette deg selv"
        )
        .then(() => {
          this.$store.getters.requests.forEach(request => {
            if (request.email === this.$store.getters.email) {
              fb.usersCollection
                .doc(request.uid)
                .collection("requests")
                .doc(request.id)
                .delete();
            } else if (
              request.connectedUser &&
              (request.connectedUser.email === this.$store.getters.email ||
                request.connectedUser.phoneNumber ===
                  this.$store.getters.phoneNumber)
            ) {
              fb.usersCollection
                .doc(request.uid)
                .collection("requests")
                .doc(request.id)
                .update({ connectedUser: null });
            }
          });
          fb.usersCollection.doc(this.$store.getters.id).delete();
          fb.additionalUserInfoCollection.doc(this.$store.getters.id).delete();
          firebase
            .auth()
            .signOut()
            .then(() => {
              this.$store.dispatch("SET_CURRENT_USER", null);
              this.$router.push("/login");
            })
            .catch(error => {
              console.log(`something went wrong ${error.message}`);
            });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper > section + section {
  margin-top: 3rem;
}

section > * + * {
  margin-top: 1rem;
}
</style>
