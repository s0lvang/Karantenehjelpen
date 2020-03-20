<template>
  <div class="container">
    <div class="formContainer">
      <form>
        <div class="inputContainer">
          <label for="email">Epostaddresse</label>
          <input id="email" type="email" v-model="email" />
        </div>
        <div class="authContainer">
          <Button
            btnText="Send login-lenke"
            class="authBtn"
            :btnDisabled="false"
            @btnClicked="register"
            required
          />
        </div>
      </form>
    </div>
    <p class="error" v-if="errorCode">{{ errorMessage }}</p>
    <p class="success" v-if="sentMail">
      Sjekk eposten din for lenke å logge inn med!
    </p>
  </div>
</template>

<script>
import { getErrorMessage, handleSignedIn } from "@/helpers/auth";
import { registerWithEmail, login } from "@/services/firebase";
import Button from "@/components/shared/Button.vue";

export default {
  name: "LoginArea",
  data() {
    return {
      email: "",
      errorCode: null,
      sentMail: false
    };
  },
  components: {
    Button
  },
  computed: {
    errorMessage() {
      return getErrorMessage(this.errorCode);
    }
  },
  methods: {
    async register() {
      this.errorCode = await registerWithEmail(this.email, () => {
        this.sentMail = true;
      });
    }
  },
  async beforeMount() {
    this.errorCode = await login(window.location.href, this.$dialog, currUser =>
      handleSignedIn(this, currUser)
    );
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 3rem;
}

.formContainer {
  display: flex;
  justify-content: center;
}
.inputContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 300px;

  input {
    width: 100%;
    color: $color-text;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    border: 1px solid $color-background-contrast;
    @include elevation-soft;
    margin-bottom: 0.5rem;
  }
}

.authContainer {
  display: flex;
  flex-direction: column;

  .authBtn {
    margin: 0.5rem 0;
    width: 100%;
    max-width: 250px;
    align-self: center;
  }
  #signinBtn {
    background: none;
    border: 1px solid $color-primary;
    color: $color-primary;
    &:hover {
      opacity: 0.7;
    }
  }
}

.error {
  text-align: center;
  color: $color-danger;
}

.success {
  text-align: center;
  color: #066f06;
}
</style>
