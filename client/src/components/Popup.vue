<template>
    <v-card v-if="temlogin" class="popup">
        <h1 class="text-center mt-3">Faça login</h1>
        <div class="popup-inner">
            <label>Email:</label>
            <input type="email">
            <br>
            <label>Senha:</label>
            <input type="password">
            <br>
            <button>login</button>
            <button>cadastre</button>
        </div>
    </v-card>
    <v-card v-else class="popup">
        <h1 class="text-center mt-3">Faça o Cadastro</h1>
        <div class="popup-inner">
            <label>Nome:</label>
            <input type="text">
            <br>
            <label>Email:</label>
            <input type="email">
            <br>
            <label>Senha:</label>
            <input type="password">
            <br>
            <button>login</button>
            <button>cadastre</button>
        </div>
    </v-card>
</template>
<script>
export default {
    data() {
        return {
            temlogin: false
        }
    }
}
</script>
<style>
input {
    background-color: aqua;
}

.popup {
    position: fixed;
    top: 0;
    padding: 5px;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    width: 400px;
    height: 400px;
}

.popup-inner {
    background-color: yellow;
    padding: 32px;
    margin: 50px auto;
}

.popup button {
    border-radius: 10px;
    background-color: red;
    width: 100px;
}
</style>