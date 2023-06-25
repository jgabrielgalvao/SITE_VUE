<template>
    <div>
      <div>
        <v-app-bar color="red pa-2" :elevation="4" scroll-behavior="elevate">
          <v-row no-gutters justify="center" align="center">
            <v-col cols="12">
              <v-title class="text-button text-white" id="titulo">
                <v-icon @click="toggleDrawer">mdi-menu</v-icon>
              </v-title>
            </v-col>
          </v-row>
        </v-app-bar>
      </div>
  
      <div>
        <v-navigation-drawer v-model="drawerOpen" temporary>
          <v-list-item v-for="item in menuItems" :key="item.title" :to="item.route">
            <br>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-navigation-drawer>
      </div>
  
      <Home ref="Home" v-if="false" />
    </div>
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
          { title: "Produtos", route: "/produto" },
          { title: "Início", route: "/inicio" },
          { title: "Login", route: "/login" }
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
  