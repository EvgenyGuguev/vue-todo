<template>
    <div class="note">
        <router-link class="note-link" :to="{ name: 'note-edit', params: { id: note.id } }">
            <h2>{{ note.title }}</h2>
            <ul v-for="todo in note.todos"
                :key="todo.id"
            >
                <li v-if="note.todos.indexOf(todo) < 3">
                    {{ todo.name }}
                </li>
            </ul>
        </router-link>
        <button class="delete-btn" @click="deleteNote">Delete Note</button>
    </div>
</template>

<script>
export default {
    name: "Note",
    props: {
        note: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        deleteNote() {
            this.$emit('deleteNote');
        }
    }
}
</script>

<style>
    .note {
        text-align: left;
        cursor: pointer;
        width: 30rem;
        margin-bottom: 1rem;
        padding: .1rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
    }

    .note-link {
        color: black;
        text-decoration: none;
        font-weight: 100;
    }

    .note li {
        list-style: none;
        font-size: 1rem;
    }

    .note h2 {
        text-align: center;
        text-transform: uppercase;
    }
    .delete-btn {
        cursor: pointer;
        color: white;
        border: none;
        border-radius: .3rem;
        margin: .5rem;
        background: #b52222;
        padding: .5rem;
    }
    .delete-btn:hover {
        background: red;
    }
</style>