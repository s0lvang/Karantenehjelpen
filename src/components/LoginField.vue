<template>
  <div class="container">
    <div>
      <div class="inputContainer">
        <label for="email">Epostaddresse</label>
        <input id="email" type="email" v-model="form.email" />
      </div>
      <div class="inputContainer">
        <label for="password">Passord</label>
        <input id="password" type="password" v-model="form.password" />
      </div>
      <div class="authContainer">
        <Button btnText="Login" class="authBtn" />
        <Button
          type="submit"
          @btnClicked="register"
          btnText="Lag bruker"
          class="authBtn"
          id="signinBtn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import loginUser from "@/helpers/authentication";
import Button from "@/components/shared/Button.vue";

export default {
  name: "LoginField",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  components: {
    Button
  },
  methods: {
    register() {
      console.log(this.form.email);
      console.log(this.form.password);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => loginUser(this));
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
  }
}

hr {
  border: none;
  text-align: center;

  &:after {
    content: "Eller";
  }
}
</style>
