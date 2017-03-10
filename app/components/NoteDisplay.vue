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
      Events.on("Note__select", (index, note) => {
        this.selectedNote = note;
      });

      Events.on("Note__delete", key => {
        if (this.selectedNote.key === key) {
          this.selectedNote = {};
        }
      })
    }
  }
</script>