<template>
  <div class="note-display">
    <h1>{{ selectedNote.title }}</h1>
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

    created() {
      Events.on("noteSelected", (index, note) => {
        this.selectedNote = note;
      });
    }
  }
</script>