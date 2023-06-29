<template>
  <v-app class="corpo">
    <v-main>
      <Navbar :user-info="userInfo" />
      <router-view />
      <Footer />
    </v-main>
  </v-app>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default ({
  components: {
    Navbar,
    Footer
  },
  data() {
    return {

    }
  },
  created() {
    // Importa o objeto $route do Vue Router
    const { $route } = this
    console.log($route.path) // Verifica o caminho da rota atual
  },
  mounted() {
    window.scrollTo(0, 0);
  }
})
</script>


<style>
.corpo {
  background-image: url('./assets/industry.png') !important;
}
</style>