<template>
  <div class="home">

    <modal v-if="isModal"
           @yes="yes"
           @no="no"
    />

    <h1>список заметок</h1>
    <div class="notes">
      <note
        :note="note"
        v-for="(note, noteIndex) in notes"
        :key="note.id"
        @deleteNote="deleteNote(noteIndex, note.id)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import Note from "../components/Note";
import Modal from "../components/Modal";
export default {
  name: "Home",

  data() {
    return {
      isModal: false,
      deleteFromModal: false
    }
  },
  components: { Modal, Note },
  computed: {
    ...mapGetters([
        'notes'
    ])
  },

  methods: {
    ...mapActions([
        'getNotesFromApi'
    ]),
    async deleteNote(index, id) {
      if (confirm('Действительно далить заметку?')) {
        await axios.delete('https://my-json-server.typicode.com/EvgenyGuguev/vue-todo/notes/' + id)
          .then(() => {
            this.notes.splice(index, 1)
          });
      }
    },
    yes() {
      this.deleteFromModal = true;
      this.isModal = false;
    },
    no() {
      this.deleteFromModal = false;
      this.isModal = false;

    }
  },

  mounted() {
    this.getNotesFromApi();
  }
};
</script>

<style>
  .notes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
