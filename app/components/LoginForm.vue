<template>
  <div class="well">
    <form>
      <h2>Login</h2>

      <div id="login__email-holder" class="form-group">
        <label for="login__email">Email:</label>
        <input type="text" class="form-control" id="login__email" v-model="email">
        <span id="login__email-message" class="help-block hide">This field is required.</span>
      </div>
      <div id="login__password-holder" class="form-group">
        <label for="login__password">Password:</label>
        <input type="password" class="form-control" id="login__password" v-model="password"></input>
        <span id="login__password-message" class="help-block hide">This field is required.</span>
      </div>

      <button type="button" class="btn btn-default" @click="logIn">Log In</button>
      <button type="button" class="btn btn-primary" @click="signUp">Sign Up</button>
      <p class="auth-error-message">{{ authErrorMessage }}</p>
    </form>
  </div>
</template>

<script>
  import {Auth} from "../database";
  import validate from "../helpers/ValidateForm";

  export default {
    data() {
      return {
        email: "",
        password: "",

        authErrorMessage: ""
      }
    },

    computed: {
      formTests() {
        return [
          {
            container: $("#login__email-holder"),
            conditions: [this.email.trim() !== ""],
            message: $("#login__email-message")
          },
          {
            container: $("#login__password-holder"),
            conditions: [this.password.trim() !== ""],
            message: $("#login__password-message")
          },
        ]
      }
    },

    methods: {
      signUp() {
        if (validate(this.formTests)) {
          Auth.createUserWithEmailAndPassword(this.email, this.password)
            .catch(error => {
              this.authErrorMessage = error.message;
              console.log({code: error.code, message: error.message});
          });
        }
      },

      logIn() {
        if (validate(this.formTests)) {
          Auth.signInWithEmailAndPassword(this.email, this.password)
            .catch(error => {
              this.authErrorMessage = error.message;
              console.log({code: error.code, message: error.message});
          });
        }
      },

      logOut() {
        Auth.signOut()
          .then(() => {
          // Sign-out successful.
        })
          .catch(error => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .auth-error-message {
    padding-top: 1em;
    color: #a94442;
  }
</style>