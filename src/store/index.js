import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        notes: [],
        note: {},
    },
    mutations: {
        SET_NOTES_TO_STATE(state, notes) {
            state.notes = notes;
        },
        SET_NOTE(state, note) {
            state.note = note;
        }
    },
    actions: {
        getNotesFromApi({ commit }) {
            return axios.get('https://my-json-server.typicode.com/EvgenyGuguev/vue-todo/notes')
                .then(notes => {
                    commit('SET_NOTES_TO_STATE', notes.data);
                    return notes.data;
                })
                .catch(error => {
                    return error;
                });
        },
        getNoteFromApi({ commit }, id) {
            return axios.get('https://my-json-server.typicode.com/EvgenyGuguev/vue-todo/notes/' + id)
                .then(note => {
                    commit('SET_NOTE', note.data);
                    return note.data;
                })
                .catch(error => {
                    return error;
                });
        }
    },
    getters: {
        notes(state) {
            return state.notes;
        },
        note(state) {
            return state.note;
        }
    }
});
