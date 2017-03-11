<template>
  <div class="app">
    <login-navigation></login-navigation>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <note-list v-if="user" :notes="notes"></note-list>
        </div>

        <div class="col-md-offset-1 col-md-8">
          <note-display v-if="user"></note-display>
          <login-form v-else></login-form>
          <note-editor :categories="categories"></note-editor>
          <category-editor></category-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Events from "./events";
  import {Database, Auth} from "./database";

  import LoginNavigation from "./components/LoginNavigation.vue";
  import LoginForm from "./components/LoginForm.vue";
  import NoteList from "./components/NoteList.vue";
  import NoteEditor from "./components/NoteEditor.vue";
  import CategoryEditor from "./components/CategoryEditor.vue";
  import NoteDisplay from "./components/NoteDisplay.vue";

  export default {
    components: {
      LoginNavigation,
      LoginForm,
      NoteList,
      NoteEditor,
      CategoryEditor,
      NoteDisplay
    },

    data() {
      return {
        user: null,
        selectedNote: {},

        categories: {},
        notes: {}
      };
    },

    methods: {
      updateNotes() {
        Database.loadNotes(this.user.uid, snapshot => {
          this.notes = snapshot.val();
        });
      },

      updateCategories() {
        Database.loadCategories(this.user.uid, snapshot => {
          this.categories = snapshot.val();
        });
      }
    },

    created() {
      Events.on("Note__select", (index, note) => {
        this.selectedNote = note;
      });

      Events.on("Note__save--create", note => {
        const newRef = Database.createNote(this.user.uid, note);
        this.updateNotes();
      });

      Events.on("Note__save--edit", note => {
        Database.editNote(this.user.uid, note);
        this.updateNotes();
      });

      Events.on("Note__delete", key => {
        Database.removeNote(this.user.uid, key);

        if (this.selectedNote.key === key) {
          this.selectedNote = null;
        }
        this.updateNotes();
      });

      Events.on("Category__create", category => {
        const newRef = Database.createCategory(this.user.uid, category);
        this.updateCategories();
      });

      Auth.onAuthStateChanged(user => {
        this.user = user;

        if (user) {
          this.updateNotes();
          this.updateCategories();
        }
      });
    }
  };
</script>