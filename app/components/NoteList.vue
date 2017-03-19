<template>
  <div class="note-list list-group">
    <button class="list-group-item list-group-item-info"
            @click="openCategoryEditor()">
      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      Create category
    </button>

    <button v-for="note in notes"
            @click="selectNote(note.key)"
            class="list-group-item"
            :class="[note.key === selected ? 'active' : '']">
      <div :class="getCategoryMarker(note.category.color)"></div>
      {{ note.title }}
      <div class="btn-group pull-right" role="group" aria-label="Options">
        <!-- Edit button -->
        <button class="btn btn-info" @click.stop="editNote(note)">
          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        </button>
        <!-- Delete button -->
        <button class="btn btn-danger" @click.stop="deleteNote(note.key)">
        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
        </button>
      </div>
      
    </button>

    <button class="list-group-item list-group-item-info"
            @click="openNoteEditor()">
      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      Create note
    </button>
  </div>
</template>

<script>
  import Events from "../events";
  import {Database, Auth} from "../database";

  export default {
    props: ["notes"],

    data() {
      return {
        selected: null
      };
    },

    methods: {
      selectNote(key) {
        this.selected = key;
        Events.emit("Note__select", key, this.notes[key]);
      },

      editNote(note) {
        Events.emit("Note__edit", note);
      },

      deleteNote(key) {
        Events.emit("Note__delete", key);
      },

      openNoteEditor() {
        Events.emit("Editor__open--note");
      },

      openCategoryEditor() {
        Events.emit("Editor__open--category");
      },

      getCategory(key) {
        const uid = Auth.currentUser.uid;
        Database.getCategoryFromKey(uid, key, category => {
          console.log(category);
        })
      },

      getCategoryMarker(color) {
        return "pull-left category-marker category-" + color;
      }
    }
  }
</script>

<style scoped>

  .category-marker {
    width: 16px;
    height: 34px;
    margin-right: 10px;
  }

  .category-red    {background: red;}

  .category-yellow {background: yellow;}

  .category-blue   {background: blue;}

  .category-green  {background: green;}

  .category-purple {background: purple;}
</style>