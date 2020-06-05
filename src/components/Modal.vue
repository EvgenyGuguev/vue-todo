<template>
    <div class="modal">
        <div class="main-modal">
            <h1>Вы уыерены?</h1>
            <div>
                <button class="btn" @click="yes">Да</button>
                <button class="btn" @click="no">Нет</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        methods: {
            yes() {
                this.$emit('yes');
            },
            no() {
                this.$emit('no');
            },
        }
    };
</script>


<style scoped>
    .modal {
        background: rgba(56, 51, 51, 0.47);
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
        z-index: 10;
    }

    .main-modal {
        box-shadow: 2px 4px 5px #a5a5a5;
        background: white;
        padding: 1rem;
        position: absolute;
        top: 6rem;
        width: 35rem;
    }

    .btn {
        background-color: #4CAF50;
        border: none;
        border-radius: .3rem;
        color: white;
        padding: .5rem 1.5rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        margin: 1rem;
        cursor: pointer;
    }
</style>