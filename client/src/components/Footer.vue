<template>
    <v-footer
      class="bg-indigo-lighten-1 text-center d-flex flex-column"
    >
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>
  
      <div class="pt-0">
        Buscando sempre atingir o público que valoriza o design e a estética do produto.
      </div>
  
      <v-divider></v-divider>
  
      <div>
        {{ new Date().getFullYear() }} — <strong>Vento Fresco®</strong>
      </div>
    </v-footer>
  </template>


<script>

</script>