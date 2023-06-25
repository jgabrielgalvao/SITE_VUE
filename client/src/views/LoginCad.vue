<template>
    <v-card class="bg-blue mt-5 mx-auto px-6 py-8" max-width="344" v-if="!temlogin" variant="outlined">
        <v-form v-model="form" @submit.prevent="onlogin">
            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                label="Email"></v-text-field>

            <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
                placeholder="Enter your password"></v-text-field>

            <br>

            <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                Login
            </v-btn>
            <br>
            <v-btn @click="cad()" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                Cadastro
            </v-btn>
        </v-form>
    </v-card>

    <v-card class="bg-blue mt-5 mx-auto px-6 py-8" max-width="344" v-else variant="outlined">
        <v-form v-model="form" @submit.prevent="oncadastro">

            <v-text-field v-model="nome" :readonly="loading" :rules="[required]" class="mb-2" clearable
                label="Nome"></v-text-field>

            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable label="Email"
                type="email"></v-text-field>

            <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
                placeholder="Enter your password" type="password"></v-text-field>

            <br>

            <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                Cadastrar
            </v-btn>
            <br>
            <v-btn @click="login()" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                Login
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
import clientes from "@/data/clientes.json";

export default {
    data: () => ({
        form: false,
        email: null,
        password: null,
        loading: false,
        temlogin: false
    }),

    methods: {
        onlogin() {
            if (!this.form) return;

            this.loading = true;

            // Simulando autenticação

            setTimeout(() => (this.loading = false), 2000);
        },
        required(v) {
            return !!v || 'Campo é obrigatório'
        },
        cad() {
            this.temlogin = true;
        },
        login() {
            this.temlogin = false;
        }
    },
}
</script>

<style></style>