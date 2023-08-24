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

            <v-dialog v-model="showAlertLogin" persistent max-width="300">
                <v-card>
                    <v-card-text>
                        Logo ô arrombado!
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="success" text @click="roteamento()">OK</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

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
import http from '@/http'
import router from '@/router/index'
import gb from '@/controller/globalVariables'

export default {
    data: () => ({
        form: false,
        email: null,
        password: null,
        loading: false,
        temlogin: false,
        showAlert: false,
        showAlertLogin: false,
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
        //REDIRECIONAMENTO APÓS LOGIN BEM SUCEDIDO
        roteamento() {
            this.showAlertLogin = false;
        },
        //LOGIN
        //////////////////////////
        onlogin() {

            this.loading = true;

            setTimeout(() => (this.loading = false), 5000);
            console.log(this.email, this.password);

            let data = {
                email: this.email,
                password: this.password
            }
            console.log(data);
            http.post('/verificalogin', data)
                .then(response => {
                    gb.token = response.data.token;
                    gb.usuarioLogado = true;   

                    console.log('token na variavel global: ', gb.token);

                    this.showAlertLogin = true;
                    setTimeout(() => {
                        router.push({ name: 'Dashboard' })
                    }, 5000);

                })
                .catch(error => {
                    console.error(error);

                    this.loading = false;
                });
        },
        //CADASTRO
        /////////////////////
        oncadastro() {
            this.loading = true;

            if (this.location == "Gerente vendas") {
                this.location = 'gerente_vendas'
            } else if (this.location == "Gerente produção") {
                this.location = 'gerente_producao'
            } else if (this.location == "Cliente") {
                this.location = 'client'
            } else if (this.location == "Admin") {
                this.location = 'admin'
            } else if (this.location == "Cliente") {
                this.location = 'client'
            }

            console.log(this.email, this.password);

            // Objeto contendo os dados do cadastro
            const data = {
                name: this.nome,
                email: this.email,
                password: this.password,
                typeUser: this.location,
                authPassword: this.authPassword
            };

            if (this.location === 'client') {


                // Executar o post diretamente para 'Cliente'

                http.post('/usuario', data)
                    .then(response => {
                        this.showAlert = true;

                        // Limpar os campos do formulário
                        this.nome = null;
                        this.email = null;
                        this.password = null;
                        this.location = 'Cliente';
                        this.authPassword = '';

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

                    http.post('/usuario', data)
                        .then(response => {
                            this.showAlert = true;

                            // Limpar os campos do formulário
                            this.nome = null;
                            this.email = null;
                            this.password = null;
                            this.location = 'Cliente';
                            this.authPassword = '';

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
        //REQUIREMENTO DOS CAMPOS
        required(v) {
            return !!v || 'Campo é obrigatório'
        },
        //REDIRECIONAMENTO PARA AS PÁGINAS
        //CADASTRO
        cad() {
            this.temlogin = true;
        },
        //LOGIN
        login() {
            this.temlogin = false;
        }
    }
}
</script>

<style></style>