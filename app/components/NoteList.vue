<template>
  <div class="note-list list-group">
    <button v-for="(note, index) in notes" @click="selectNote(index)" class="list-group-item" :class="[index === selected ? 'active' : '']">
      {{ note.name }}
    </button>

    <button class="list-group-item list-group-item-info">
      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      Add note
    </button>
  </div>
</template>

<script>
  import Events from "../events";

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
      }
    }
  }
</script>