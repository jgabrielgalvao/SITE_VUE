<template>
    <v-container>
        <v-sheet :elevation="3" class="mt-5 pa-10 ma-auto" width="90%">
            <v-row class="ma-auto" width="100%">
                <v-breadcrumbs :items="items">
                </v-breadcrumbs>
            </v-row>
            <v-row class="mt-12">
                <v-col class="mt-5" cols="5">
                    <v-img :src="produto.imagem" max-width="400px"></v-img>
                </v-col>

                <v-col class="d-flex flex-column ml-10">
                    <v-card class="text-wrap" :elevation="0">
                        <p class="text-h5">{{ produto.nome }}</p>
                        <p>Cód. Produto: {{ produto.id }}</p>
                    </v-card>
                    <p class="mt-12 text-h5 text-indigo-accent-4">
                        {{ (produto.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}
                    </p>
                    <p>
                        ou até 12x de
                        {{ (produto.preco / 12).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}
                        sem juros <span @click="parcelamento" class="text-indigo-accent-4 text-decoration-underline">ver parcelamento</span>
                    </p>

                    <v-btn @click="addCarrinho(produto)" class="ma-auto" width="50%" color="green"
                        prepend-icon="mdi-shopping">Comprar</v-btn>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="mt-8 ml-12 mb-10">
                <p class="text-h6">{{ produto.nome }}</p>

                <p class="text-subtitle-1 mt-12 mb-12">{{ produto.descricao }}</p>
            </v-row>
        </v-sheet>

    </v-container>


    <v-snackbar v-model="snackbar" top>
        {{ textsnackbar }}

        <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
                Fechar
            </v-btn>
        </template>
    </v-snackbar>

    <Parcelamento ref="Parcelamento" />
</template>


<script>
import bd from '@/data/bd.json'
import Parcelamento from '@/components/Parcelamento.vue'
import globalVariables from '@/controller/globalVariables';


export default {
    components: {
        Parcelamento
    },
    computed: {
        parametro() {
            return this.$route.params.parametro;

        }
    },
    data() {
        return {
            produto: bd.find(item => item.id == this.$route.params.parametro),
            items: ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4'],
            snackbar: false,
            textsnackbar: ''
        }
    },
    methods: {
        parcelamento() {
            this.$refs.Parcelamento.dialog = true;
            this.$refs.Parcelamento.preco_produto = this.produto.preco;
        },
        addCarrinho(produto) {
            const produtoCarrinho = {
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                imagem: produto.imagem
            }
            globalVariables.listaCarrinho.splice(0, 0, produtoCarrinho)
            globalVariables.totalCarrinho += parseFloat(produtoCarrinho.preco)

            this.textsnackbar = 'Produto adicionado ao Carrinho!'
            this.snackbar = true
        },

    },
    mounted() {
        window.scrollTo(0, 0);
    }
};
</script>