<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
      <ul class="nav navbar-nav navbar-right">
        <li @click="logOut"><a href="#">Log Out</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {Auth} from "../database";

  export default {
    methods: {
      logOut() {
        Auth.signOut();
      }
    }
  }
</script>