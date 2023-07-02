<template>
  <div>
    <div>
      <v-app-bar color="red pa-2" :elevation="4" scroll-behavior="elevate">
        <v-row no-gutters justify="center" align="center">
          <v-col cols="12">
            <v-toolbar-title class="text-button text-white" id="titulo">
              <v-icon @click="toggleDrawer">mdi-menu</v-icon>
            </v-toolbar-title>
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
      typeUser: 'client',
      menuItems: []
    };
  },
  created() {
    // Importa o objeto $route do Vue Router
    const { $route } = this;
    console.log($route.params.typeUser); // Verifica o tipo de usuário da rota atual
    this.typeUser = $route.params.typeUser;
    this.updateMenuItems(this.typeUser);
  },
  watch: {
    typeUser(newTypeUser) {
      this.updateMenuItems(newTypeUser);
    },
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    handleMenuItemClick(item) {
      
      console.log("Clicou em", item.title);
      // Implemente a lógica para lidar com o clique nos itens do menu aqui
    },
    updateMenuItems(newTypeUser) {
      if (newTypeUser === 'client') {
        this.menuItems = [
          { title: 'Início', route: '/inicio' },
          { title: 'Controle', route: '/controle' },
          { title: 'Conta', route: '/conta' }
        ];
      } else if (newTypeUser === 'admin') {
        this.menuItems = [
          { title: 'Acessos', route: '/acessos' },
          { title: 'Estoque', route: '/estoque' },
          { title: 'Conta', route: '/conta' },
          { title: 'Início', route: '/inicio' }
        ];
      } else {
        this.menuItems = [
          { title: 'Produtos', route: '/produto' },
          { title: 'Início', route: '/inicio' },
          { title: 'Login', route: '/login' }
        ];
      }
    }
  }
};
</script>
  