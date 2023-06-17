<template>
    <v-container fluid class="mt-4">
      <v-row>
        <v-col cols="3">
          <v-card class="imagem mt-5" variant="outlined">
            <img :src="produto ? produto.imagem : ''" alt="Imagem do produto" />
          </v-card>
        </v-col>
        <v-col cols="4" class="mt-5 ml-10">
          <v-card variant="outlined">
            <v-card-title class="text-center">{{ produto.nome }}</v-card-title>
            <v-card-text class="text-justify">{{ produto.descricao }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" class="mt-5">
          <v-card variant="outlined">
            <v-card-text class="preco">{{ produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</v-card-text>
            <v-card-text class="titulo-formas">
              Formas de parcelamento
            </v-card-text>
            <v-card-text class="parcelas">
              <ul>
                <li v-for="parcela in formasParcelamento" :key="parcela.id">
                  {{ parcela.descricao }} - {{ parcela.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                </li>
              </ul>
            </v-card-text>
            <v-btn append-icon="mdi-cash" variant="outlined" class="ma-4">
              COMPRAR
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import bd from '@/data/bd.json';
  
  export default {
    data() {
      return {
        produtos: bd,
        produto: null,
        frete: 0,
        formasParcelamento: [],
        mostrarFormasParcelamento: false,
      };
    },
    created() {
      const id = this.$route.params.id;
      this.produto = this.produtos.find((produto) => produto.id.toString() === id);
  
      this.calcularParcelas(this.produto.preco);
    },
    methods: {
      calcularParcelas(valorProduto) {
        const parcelas = [1, 2, 3, 4, 5]; // Número de parcelas desejadas
        const taxaJuros = 0.05; // Taxa de juros (5%)
  
        this.formasParcelamento = parcelas.map((parcela) => {
          const valorParcela = (valorProduto * (1 + taxaJuros)) / parcela;
          return {
            id: parcela,
            descricao: `${parcela}x com juros`,
            valor: valorParcela,
          };
        });
      },
    },
  };
  </script>
  
  <style>
  .imagem {
    width: 300px;
    margin-left: 10px;
  }
  
  .preco {
    font-size: 30px;
    font-weight: bold;
    color: green;
  }
  
  .titulo-formas {
    cursor: pointer;
    font-weight: bold;
    margin-top: 10px;
    height: 10px;
  }
  
  .parcelas {
    margin-left: 10px !important;
  }
  </style>
  