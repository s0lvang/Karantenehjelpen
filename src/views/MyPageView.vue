<template>
  <section>
    <h1>Min side</h1>
    <section>
      <NumberInput
        labelText="Telefonnummer (uten landskode)"
        placeholderText="98765432"
        @emitNumberInput="updatePhoneNumberInput"
        :existing="phoneNumberInput"
      />
      <Button
        @btnClicked="updatePhoneNumber"
        btnText="Oppdater Telefonnummer"
        :btnDisabled="false"
      />
    </section>
    <section>
      <p>
        Hvis du sletter brukeren, slettes alle åpne bestillinger, du fjernes fra
        åpne oppdrag og all personInfo vi har på deg
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
h1 {
  display: none;
}
.role {
  @include card;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  button {
    margin: 1rem auto 0rem;
  }
  h2 {
    text-align: center;
  }
}

ol {
  text-align: left;
  list-style-type: decimal;
  padding-left: 1rem;
  margin-top: 1rem;
}

@media #{$tabletAndUp} {
  section {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  h1 {
    display: inherit;
    text-align: center;
    grid-column: 1 / -1;
  }

  .role {
    margin: 0;
    place-self: start;
  }
}
</style>
