<template>
    <div>
        <v-card class="bg-blue mt-5 mx-auto px-6 py-8" max-width="344" v-if="!temlogin" variant="outlined">
            <v-form v-model="form" @submit.prevent="onlogin">
                <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="Email"></v-text-field>

                <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
                    placeholder="Enter your password"></v-text-field>

                <br>

                <v-btn :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                    Login
                </v-btn>
                <br>
                <v-btn @click="cad()" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated">
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

                <v-select v-model="location" :items="locations" label="Tipo Usuário"></v-select>

                <v-text-field v-show="showMenu && location !== 'Cliente'" v-model="authPassword" :readonly="loading"
                    :rules="[required]" clearable label="Authenticate Password" placeholder="Enter your password"
                    type="password"></v-text-field>

                <br>

                <v-btn :loading="loading" block color="success" size="large" type="submit" variant="elevated">
                    Cadastrar
                </v-btn>
                <br>
                <v-btn @click="login()" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated">
                    Login
                </v-btn>
            </v-form>
        </v-card>

        <v-dialog v-model="showAlert" persistent max-width="300">
            <v-card>
                <v-card-text>
                    Cadastrado com sucesso, faça o login
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" text @click="showAlert = false; temlogin = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        form: false,
        email: null,
        password: null,
        loading: false,
        temlogin: false,
        showAlert: false,
        selecionado: false,
        showMenu: false,
        authPassword: '',
        locations: [
            'Cliente',
            'Admin',
            'Gerente vendas',
            'Gerente produção',
        ],
        location: 'Cliente'
    }),

    computed: {
        showMenu() {
            return this.temlogin && this.location !== 'Cliente';
        },
    },

    methods: {
        onlogin() {
            if (!this.form) return;

            this.loading = true;

            // Simulando autenticação

            setTimeout(() => (this.loading = false), 2000);
        },
        oncadastro() {
            const baseURL = 'http://localhost:8081';

            if (!this.form) return;

            this.loading = true;

            // Objeto contendo os dados do cadastro
            if (this.location == "Gerente vendas") {
                this.location = 'gerente_vendas'
            } else if (this.location == "Gerente produção") {
                this.location = 'gerente_producao'
            } else if (this.location == "Cliente") {
                this.location = 'client'
            } else if (this.location == "Admin") {
                this.location = 'admin'
            }
            const data = {
                name: this.nome,
                email: this.email,
                password: this.password,
                typeUser: this.location,
                authPassword: this.authPassword
            };

            if (this.location === 'client') {
                // Executar o post diretamente para 'Cliente'
                const data = {
                    name: this.nome,
                    email: this.email,
                    password: this.password,
                    typeUser: this.location,
                };

                axios.post(`${baseURL}/usuario`, data)
                    .then(response => {
                        this.showAlert = true;

                        // Limpar os campos do formulário
                        this.nome = null;
                        this.email = null;
                        this.password = null;
                        this.location = 'Cliente';
                        this.authPassword = '';

                        this.loading = false;
                    })
                    .catch(error => {
                        console.error(error);

                        this.loading = false;
                    });
            } else {
                // Executar a verificação adicional para outras opções de localização
                if (this.authPassword === 'ok') {
                    const data = {
                        name: this.nome,
                        email: this.email,
                        password: this.password,
                        typeUser: this.location,
                        authPassword: this.authPassword,
                    };

                    axios.post(`${baseURL}/usuario`, data)
                        .then(response => {
                            this.showAlert = true;

                            // Limpar os campos do formulário
                            this.nome = null;
                            this.email = null;
                            this.password = null;
                            this.location = 'Cliente';
                            this.authPassword = '';

                            this.loading = false;
                        })
                        .catch(error => {
                            console.error(error);

                            this.loading = false;
                        });
                } else {
                    alert('Senha não confere');
                }
            }
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