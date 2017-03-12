<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
      <ul class="nav navbar-nav navbar-right">
        <li v-if="user"><a href="#">{{ user.email }}</a></li>
        <li v-if="user" @click="logOut"><a href="#">Log Out</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {Auth} from "../database";
  import Events from "../events";

  export default {

    data() {
      return {
        user: false
      }
    },

    methods: {
      logOut() {
        Auth.signOut();
      }
    },

    created() {
      Events.on("User__changeState", user => {
        console.log(user);
        this.user = user;
      });
    }
  }
</script>