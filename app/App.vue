<template>
  <div class="app container-fluid">
    <div class="row">
      <div class="col-sm-3">
        <note-list
          :notes="notes">
        </note-list>
      </div>

      <div class="col-sm-offset-1 col-sm-8">
        
      </div>
    </div>
  </div>
</template>

<script>
  import Events from "./events";
  import Firebase from "firebase";
  import NoteList from "./components/NoteList.vue"

  let config = {
    apiKey: "AIzaSyCzplRModOK-ir_ybndG10S6croPq1I8fU",
    authDomain: "begonia-cbe77.firebaseapp.com",
    databaseURL: "https://begonia-cbe77.firebaseio.com",
    storageBucket: "begonia-cbe77.appspot.com",
    messagingSenderId: "656500064171"
  };

  Firebase.initializeApp(config);
  const database = Firebase.database();



  export default {
    components: {
      NoteList
    },

    data() {
      return {
        notes: [
          {name: "Note1"},
          {name: "Note2"}
        ]
      }
    },

    created() {
      Events.on("noteSelected", index => console.log(index));
    }
  };
</script>

<style scoped>
  .app {
    padding-top: 30px;
  }
</style>