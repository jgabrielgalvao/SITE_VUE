<template>
  <v-app>
    <v-main>
      <Navbar />

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
body {
  background-color: #BBDEFB;
}
</style>