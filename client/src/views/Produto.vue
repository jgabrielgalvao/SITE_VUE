<template>
    <div class="mt-4">
      <h1 class="text-center">Lista de Produtos</h1>
      <br>
      <v-row>
        <v-col v-for="produto in produtos" :key="produto.id" cols="12" sm="6" md="4" lg="3">
          <v-card class="mb-5" @click="verProduto(produto.id)">
            <v-img :src="produto.imagem" alt="Imagem do produto" height="200"></v-img>
            <v-card-title>{{ produto.nome }}</v-card-title>
            <v-card-text>
              <p>R$ {{ produto.preco.toFixed(2) }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  import bd from '@/data/bd.json';
  
  export default {
    data() {
      return {
        produtos: bd,
      };
    },
    methods: {
      verProduto(id) {
        this.$router.push({ name: 'produto-view', params: { id } });
      },
    },
  };
  </script>
  