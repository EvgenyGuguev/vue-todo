<template>
    <form class="note-edit">
        <div class="note">
            <input
                    ref="title"
                    class="input-title"
                    :disabled="!isEditing"
                    :class="{view: !isEditing}"
                    v-model="note.title"
            />
            <div class="todos-list">
                <ul>
                    <li
                        v-for="(todo, todoIndex) in note.todos"
                        :key="todo.id"
                    >
                        <input
                                type="checkbox"
                                ref="todo"
                                @change="todo.done = !todo.done"
                                id="todo"
                                name="todo"
                                :checked="todo.done"
                                :disabled="!isEditing"

                        >
                        <input  class="input-name-todo" v-model="todo.name">
                        <button
                                @click="deleteTodo(todoIndex)"
                                class="btn btn-todo-delete"
                                :disabled="!isEditing"
                        >delete
                        </button>
                    </li>
                </ul>
            </div>
            <input type="text" v-model="newTodo.name" class="todo-name" :disabled="!isEditing">
            <div>
                <button @click.prevent="addTodo" class="btn" :disabled="!isEditing">Add Todo</button>
                <button @click.prevent="deleteNote" class="btn btn-delete">DELETE NOTE</button>
            </div>
        </div>
        <div>
            <button @click.prevent="saveLocalStorage" v-if="!isEditing" class="btn">
            Редактировать заметку
            </button>
            <button @click.prevent="saveNote" v-else-if="isEditing" class="btn">
                Сохранить изменения
            </button>
            <button v-if="isEditing" @click.prevent="cancel" class="btn">
                Отменить изменения
            </button>
            <button v-if="isEditing && isCanceled" @click.prevent="repeatChanges" class="btn">
                Вернуть изменения
            </button>
            <button v-if="isEditing && isSaving" @click.prevent="cancelAllChanges" class="btn">
                Отменить редактирование
            </button>
        </div>
    </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from "axios";

export default {
    name: "NoteEdit",
    data() {
        return {
            isSaving: false,
            isEditing: false,
            isCanceled: false,
            newTodo: {
                id: 1,
                name: '',
                done: false
            }
        }
    },
    methods: {
        ...mapActions([
            'getNoteFromApi'
        ]),
        async saveNote() {
            const config = { headers: {'Content-Type': 'application/json'} };
            await axios.put('http://localhost:3000/notes/' + this.$route.params.id, {
                title: this.$refs['title'].value,
                todos: this.note.todos
            }, config);
            this.isSaving = true;
        },
        async deleteNote() {
            if (confirm('Действительно далить заметку?')) {
                await axios.delete('http://localhost:3000/notes/' + this.note.id)
                    .then(() => {
                        let index = this.notes.indexOf(this.note);
                        this.notes.splice(index, 1)
                    });
                await this.$router.push('/');
            }
        },
        addTodo() {
            let { name, done } = this.newTodo;
            this.note.todos.push({
                id: this.todosLength + 1,
                name,
                done
            });
            this.newTodo.name = ''
        },
        deleteTodo(index) {
            this.note.todos.splice(index, 1);
        },
        cancel() {
            localStorage.setItem('changes', JSON.stringify(this.note));
            this.getNoteFromApi(this.$route.params.id);
            this.isCanceled = true;
        },
        repeatChanges() {
            const local = localStorage.getItem('changes');
            const note = JSON.parse(local);
            this.note.title = note.title;
            this.note.todos = note.todos;
        },
        saveLocalStorage() {
            this.isEditing = !this.isEditing;
            localStorage.setItem('default', JSON.stringify(this.note));
        },
        cancelAllChanges() {
            if (confirm('Действительно отменить все действия?')) {
                const local = localStorage.getItem('default');
                const note = JSON.parse(local);
                this.note.title = note.title;
                this.note.todos = note.todos;

                this.saveNote();
            }
        }
    },
    created() {
        this.getNoteFromApi(this.$route.params.id);
    },
    computed: {
        ...mapGetters([
            'note',
            'notes'
        ]),
        todosLength() {
            return this.note.todos.length;
        }
    }
}
</script>

<style scoped>
    li, ul {
        padding: 0;
        margin: .7rem 0;
    }
    .note-edit {
        cursor: default;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 50rem;
        margin: 0 auto;
    }
    .note {
        cursor: default;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .view {
        border-color: transparent;
        background-color: initial;
        color: initial
    }
    .input-title {
        text-align: center;
        font-size: 2rem;
        border: none;
    }
    .todo-name {
        font-size: 1rem;
        padding: .6rem;
    }
    .input-name-todo {
        font-size: 1rem;
        padding: .6rem;
        border: none;
        margin-left: 1rem;
    }
    .btn {
        background-color: #4CAF50;
        border: none;
        border-radius: .3rem;
        color: white;
        padding: .7rem 1rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        margin: 1rem;
        cursor: pointer;
    }
    .btn:hover {
        background-color: #338536;
    }
    .btn-todo-delete {
        background-color: #b52222;
        margin: 0 .5rem;
        padding: .2rem;
    }
    .btn-todo-delete:hover {
        background-color: #ff0000;
    }
    .btn-delete {
        background-color: #b52222;
    }
    .btn-delete:hover {
        background-color: #ff0000;
    }

</style>