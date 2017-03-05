<template>
  <div class="list-group">
    <button v-for="(note, index) in notes" @click="selectNote(index)" class="list-group-item" :class="[index === selected ? 'active' : '']">
      {{ note.name }}
    </button>
  </div>
</template>

<script>
  import Events from "../events";

  export default {
    props: ["notes"],

    data() {
      return {
        selected: 0
      }
    },

    methods: {
      selectNote(index) {
        this.selected = index;
        Events.emit("noteSelected", index);
      }
    }
  }
</script>