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
  import Database from "./database";

  import NoteList from "./components/NoteList.vue";
  import NoteEditor from "./components/NoteEditor.vue";
  import NoteDisplay from "./components/NoteDisplay.vue";

  export default {
    components: {
      NoteList,
      NoteEditor,
      NoteDisplay
    },

    data() {
      return {
        selectedNote: {},

        notes: []
      };
    },

    created() {
      Events.on("noteSelected", (index, note) => {
        this.selectedNote = note;
      });

      Events.on("noteCreated", note => {
        Database.addNote(note);
        this.notes.push(note);
      });

      Database.loadNotes(snapshot => this.notes = snapshot.val());
    }
  };
</script>

<style scoped>
  .app {
    padding-top: 30px;
  }
</style>