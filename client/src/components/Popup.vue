<template>
    <v-card class="bg-blue mx-auto px-6 py-8" max-width="344" v-if="!temlogin">
        <v-form v-model="form" @submit.prevent="onSubmit">
            <label>Faça login</label>
            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                label="Email"></v-text-field>

            <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
                placeholder="Enter your password"></v-text-field>

            <br>

            <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                Login
            </v-btn>
            <br>
            <v-btn :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                Cadastro
            </v-btn>
        </v-form>
    </v-card>

    <v-card class="bg-blue mx-auto px-6 py-8" max-width="344" v-else>
        <v-form v-model="form" @submit.prevent="onSubmit">

            <v-text-field v-model="nome" :readonly="loading" :rules="[required]" class="mb-2" clearable
                label="Nome"></v-text-field>

            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                label="Email" type="email"></v-text-field>

            <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
                placeholder="Enter your password" type="password"></v-text-field>

            <br>

            <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                Cadastrar
            </v-btn>
            <br>
            <v-btn :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                Login
            </v-btn>
        </v-form>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        form: false,
        email: null,
        password: null,
        loading: false,
        temlogin: false
    }),

    methods: {
        onSubmit() {
            if (!this.form) return

            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        required(v) {
            return !!v || 'Campo é obrigatório'
        },
    },
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