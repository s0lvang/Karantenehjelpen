<template>
  <section class="wrapper">
    <h2>Min side</h2>
    <section>
      <PhoneNumberInput
        labelText="Telefonnummer (uten landskode)"
        placeholderText="98765432"
        @emitNumberInput="updatePhoneNumberInput"
        @emitButton="checkButton"
        :existing="phoneNumberInput"
      />
      <Button
        @btnClicked="updatePhoneNumber"
        btnText="Oppdater telefonnummer"
        :btnDisabled="buttonDisabled"
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
import PhoneNumberInput from "@/components/shared/PhoneNumberInput.vue";
import fb from "@/firebaseConfig.js";
import firebase from "firebase";

export default {
  name: "MyPage",
  components: {
    Button,
    PhoneNumberInput
  },
  data() {
    return {
      phoneNumberInput: "",
      buttonDisabled: true
    };
  },
  mounted() {
    this.phoneNumberInput =
      this.$store.getters.phoneNumber || this.$store.getters.phoneNumberInput;
  },
  methods: {
    checkButton(val) {
      this.buttonDisabled = val;
    },
    updatePhoneNumberInput(event) {
      const { value } = event.target;
      this.phoneNumberInput = value;
    },

    updatePhoneNumber() {
      fb.additionalUserInfoCollection
        .doc(this.$store.getters.id)
        .update({ phoneNumber: this.phoneNumberInput });
      this.$store.getters.requests
        .filter(
          request =>
            request.connectedUser &&
            request.connectedUser.email === this.$store.getters.email
        )
        .forEach(request => {
          fb.usersCollection
            .doc(request.uid)
            .collection("requests")
            .doc(request.id)
            .update({
              connectedUser: {
                phoneNumber: this.phoneNumberInput,
                name: this.$store.getters.name,
                email: this.$store.getters.email
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
