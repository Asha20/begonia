<template>
  <div class="note-display">
    <h1>{{ selectedNote.name }}</h1>
    {{ selectedNote.content }}
  </div>
</template>

<script>
  import Events from "../events";

  export default {
    data() {
      return {
        selectedNote: {}
      };
    },

    mounted() {
      Events.on("noteSelected", (index, note) => {
        this.selectedNote = note;
      });
    }
  }
</script>