<template>
  <div class="app container-fluid">
    <div class="row">
      <div class="col-md-3">
        <note-list
          :notes="notes">
        </note-list>
      </div>

      <div class="col-md-offset-1 col-md-8">
        <note-display></note-display>
      </div>
    </div>
  </div>
</template>

<script>
  import Events from "./events";
  import Firebase from "firebase";

  import NoteList from "./components/NoteList.vue";
  import NoteDisplay from "./components/NoteDisplay.vue";

  const config = {
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
      NoteList,
      NoteDisplay
    },

    data() {
      return {
        selectedNote: {},

        notes: [
          {name: "Note1", content: "abacaba"},
          {name: "Note2", content: "cabababa"}
        ]
      };
    },

    created() {
      Events.on("noteSelected", function(index, note) {
        this.selectedNote = note;
      });
    }
  };
</script>

<style scoped>
  .app {
    padding-top: 30px;
  }
</style>