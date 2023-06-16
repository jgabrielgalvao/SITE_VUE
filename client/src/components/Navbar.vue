<template>
    <v-app-bar color="red pa-2" :elevation="5">
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12">
          <v-title class="text-button text-white" id="titulo">
            <v-icon @click="toggleDrawer">mdi-menu</v-icon>
          </v-title>
        </v-col>
      </v-row>
    </v-app-bar>
  
    <v-navigation-drawer v-model="drawerOpen" temporary>
      <v-list>
        <v-list-item>Produto</v-list-item>
      </v-list>
    </v-navigation-drawer>
  
    <Home ref="Home" v-if="false" />
  </template>
  
  <script>
  import Home from "@/views/Home.vue";
  
  export default {
    components: {
      Home
    },
    data() {
      return {
        drawerOpen: false,
        menuItems: [
          { title: "Produtos" },
          { title: "Início" },
          { title: "Login" }
        ]
      };
    },
    methods: {
      toggleDrawer() {
        this.drawerOpen = !this.drawerOpen;
      },
      handleMenuItemClick(item) {
        console.log("Clicou em", item.title);
        // Implemente a lógica para lidar com o clique nos itens do menu aqui
      }
    }
  };
  </script>
  