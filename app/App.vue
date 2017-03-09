<template>
  <div class="app container-fluid">
    <div class="row">
      <div class="col-md-3">
        <note-list :notes="notes"></note-list>
      </div>

      <div class="col-md-offset-1 col-md-8">
        <note-display></note-display>
        <note-editor :categories="categories"></note-editor>
        <category-editor></category-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import Events from "./events";
  import Database from "./database";

  import NoteList from "./components/NoteList.vue";
  import NoteEditor from "./components/NoteEditor.vue";
  import CategoryEditor from "./components/CategoryEditor.vue";
  import NoteDisplay from "./components/NoteDisplay.vue";

  export default {
    components: {
      NoteList,
      NoteEditor,
      CategoryEditor,
      NoteDisplay
    },

    data() {
      return {
        selectedNote: {},

        categories: {},
        notes: {}
      };
    },

    methods: {
      updateNotes() {
        Database.loadNotes(snapshot => {
          this.notes = snapshot.val();
        });
      },

      updateCategories() {
        Database.loadCategories(snapshot => {
          this.categories = snapshot.val();
        });
      }
    },

    created() {
      Events.on("noteSelected", (index, note) => {
        this.selectedNote = note;
      });

      Events.on("noteCreated", note => {
        const newRef = Database.createNote(note);
        this.updateNotes();
      });

      Events.on("noteEdited", note => {
        Database.editNote(note);
        this.updateNotes();
      });

      Events.on("noteDeleted", key => {
        if (this.selectedNote.key === key) {
          this.selectedNote = null;
        }
        this.updateNotes();
      });

      Events.on("categoryCreated", category => {
        const newRef = Database.createCategory(category);
        this.updateCategories();
      });

      this.updateNotes();
      this.updateCategories();
    }
  };
</script>

<style scoped>
  .app {
    padding-top: 30px;
  }
</style>