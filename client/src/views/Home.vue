<template>
    <div class="mt-4 p-2">
        <h1 class="overlay-text">Seja bem viado</h1>
        <div v-if="!logado">
            <Popup></Popup>
        </div>
    </div>
</template>
<script>
import Popup from '@/components/Popup.vue'
export default{
    components: {
        Popup
    },
    data(){
        return{
            logado: false
        }
    },
    created(){
        //função para verificar se já está logado ou não
    }
}
</script>
<style>
body{
    background-image: url('@/assets/industry.png');
}
</style>
  