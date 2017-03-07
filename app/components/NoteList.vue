<template>
  <div class="note-list list-group">
    <button class="list-group-item list-group-item-info"
            @click="openCategoryEditor()">
      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      Create category
    </button>

    <button v-for="(note, index) in notes"
            @click="selectNote(index)"
            class="list-group-item"
            :class="[index === selected ? 'active' : '']">
      {{ note.title }}
      <button class="btn btn-danger pull-right" @click.stop="deleteNote(index)">
        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
      </button>
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
  import Database from "../database";

  export default {
    props: ["notes"],

    data() {
      return {
        selected: null
      };
    },

    methods: {
      selectNote(index) {
        this.selected = index;
        Events.emit("noteSelected", index, this.notes[index]);
      },

      deleteNote(index) {
        const key = this.notes[index].key;
        Database.removeNote(key);
        Events.emit("noteDeleted", key);
      },

      openNoteEditor() {
        Events.emit("openNoteEditor");
      },

      openCategoryEditor() {
        Events.emit("openCategoryEditor");
      }
    }
  }
</script>