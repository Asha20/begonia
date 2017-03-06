<template>
  <div class="app container-fluid">
    <div class="row">
      <div class="col-md-3">
        <note-list :notes="notes"></note-list>
      </div>

      <div class="col-md-offset-1 col-md-8">
        <note-display></note-display>
        <note-editor></note-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import Events from "./events";
  import Firebase from "firebase";

  import NoteList from "./components/NoteList.vue";
  import NoteEditor from "./components/NoteEditor.vue";
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
      NoteEditor,
      NoteDisplay
    },

    data() {
      return {
        selectedNote: {},

        notes: [
          {title: "Note1", content: "abacaba"},
          {title: "Note2", content: "cabababa"}
        ]
      };
    },

    created() {
      Events.on("noteSelected", (index, note) => {
        this.selectedNote = note;
      });

      Events.on("noteCreated", note => this.notes.push(note));
    }
  };
</script>

<style scoped>
  .app {
    padding-top: 30px;
  }
</style>