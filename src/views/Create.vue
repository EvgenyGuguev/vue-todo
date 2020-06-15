<template>
    <div>
        <h1>Добавить Заметку</h1>

        <div class="note-title">
            <h2>Title: </h2>
            <input type="text" v-model="newNote.title">
        </div>

        <div class="todos-list">
            <h2>Todos: </h2>
            <input type="text" v-model="newTodo.name">
            <button @click="addTodo" class="btn todo-btn">Add Todo</button>
        </div>

        <ul class="list" v-if="newNote.todos.length > 0">
            <li v-for="todo in newNote.todos" :key="todo.id" class="test-li">
                {{ todo.name }}
            </li>
        </ul>

        <button @click="addNote" class="btn">Add Note</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';
    export default {
        name: "Test",
        data() {
            return {
                newTodo: {
                    id: 1,
                    name: '',
                    done: false
                },
                newNote: {
                    title: '',
                    todos: []
                }
            }
        },
        methods: {
            async addNote() {
                const res = await axios.post('http://localhost:3000/notes', {
                    title: this.newNote.title,
                    todos: this.newNote.todos
                });

                this.notes.push(res.data);
                this.newNote.title = '';
                await this.$router.push('/');
            },
            addTodo() {
                let { name, done } = this.newTodo;
                this.newNote.todos.push({
                    id: this.todosLength + 1,
                    name,
                    done
                });
                this.newTodo.name = '';
            }
        },
        computed: {
            todosLength() {
                return this.newNote.todos.length;
            },
            ...mapGetters([
                'notes'
            ]),

        }
    }
</script>

<style scoped>
    h1 {
        font-size: 1.5rem;
        text-transform: uppercase;
    }
    ul {
        margin: 0;
        padding: 0;
    }
    li {
        list-style: none;
    }
    .note-title {
        max-width: 30rem;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        display: flex;
    }
    .note-title input {
        font-size: 1rem;
        width: 21rem;
        padding: .6rem;
    }
    .todos-list {
        max-width: 30rem;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        display: flex;
    }
    .todos-list input {
        font-size: 1rem;
        padding: .6rem;
        width: 11rem;
    }
    .list {
        max-width: 30rem;
        border: .01rem solid gray;
        margin: 0 auto;
        padding: 1rem 3rem;
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
        font-size: 16px;
        margin: 1rem;
        cursor: pointer;
    }
    .btn:hover {
        background-color: #338536;
    }
</style>