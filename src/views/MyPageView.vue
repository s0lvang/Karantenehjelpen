<template>
  <section class="wrapper">
    <h2>Min side</h2>
    <section>
      <PhoneNumberInput
        labelText="Telefonnummer (uten landskode)"
        placeholderText="00000000"
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
import {
  updateUserPhoneNumber,
  updateRequest,
  deleteRequest,
  deleteUser,
  signOut
} from "@/services/firebase";

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
      updateUserPhoneNumber(this.$store.getters.id, this.phoneNumberInput);

      this.$store.getters.requests
        .filter(
          request =>
            request.connectedUser &&
            request.connectedUser.email === this.$store.getters.email
        )
        .forEach(request =>
          updateRequest(request.uid, request.id, {
            connectedUser: {
              phoneNumber: this.phoneNumberInput,
              name: this.$store.getters.name,
              email: this.$store.getters.email
            }
          })
        );
      this.$store.dispatch("SET_CURRENT_USER", {
        ...this.$store.getters.currentUser,
        phoneNumber: this.phoneNumberInput
      });
      this.$dialog.alert("Nummeret ditt er oppdatert!");
    },

    async deleteMe() {
      try {
        await this.$dialog.confirm(
          "Dette vil slette brukeren din og alle dine oppdrag er du sikker på at du ønsker å slette deg selv"
        );
        this.$store.getters.requests.forEach(
          async ({ email, uid, id, connectedUser }) => {
            if (email === this.$store.getters.email) {
              await deleteRequest(uid, id);
              return;
            }

            if (!connectedUser) {
              return;
            }

            if (
              connectedUser.email === this.$store.getters.email ||
              connectedUser.phoneNumber === this.$store.getters.phoneNumber
            ) {
              await updateRequest(uid, id, {
                connectedUser: null
              });
            }
          }
        );

        await deleteUser(this.$store.getters.id);

        await signOut(() => {
          this.$store.dispatch("SET_CURRENT_USER", null);
          this.$router.push("/login");
        });
      } catch (err) {
        console.info(
          `Brukeren ville ikke (eller kunne ikke) slette brukeren sin. ${err}`
        );
        console.error(err);
      }
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
