<template>
  <div>
    <div class="container">
      <form>
        <div class="inputContainer">
          <label for="email">Epostaddresse</label>
          <input id="email" type="email" v-model="form.email" />
        </div>
        <div class="inputContainer">
          <label for="password">Passord</label>
          <input id="password" type="password" v-model="form.password" />
        </div>
        <div class="authContainer">
          <Button
            btnText="Login"
            class="authBtn"
            :btnDisabled="false"
            @btnClicked="login"
            required
          />
          <Button
            type="submit"
            @btnClicked="register"
            btnText="Lag bruker"
            class="authBtn"
            id="signinBtn"
            :btnDisabled="false"
          />
        </div>
      </form>
    </div>
    <p class="error" v-if="errorCode">{{ errorMessage }}</p>
  </div>
</template>

<script>
import firebase from "firebase";
import { authenticateUser, getErrorMessage } from "@/helpers/authentication";
import Button from "@/components/shared/Button.vue";

export default {
  name: "LoginArea",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      errorCode: null
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
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => authenticateUser(this))
        .catch(err => {
          this.errorCode = err.code;
        });
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          authenticateUser(this);
        })
        .catch(err => {
          this.errorCode = err.code;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
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
</style>
