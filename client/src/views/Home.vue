<template>
    <div class="mt-4 p-2 corpo">
        <h1 class="text-center titulo">Seja bem viado</h1>
        <div v-if="!logado" class="mt-16">
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
.corpo{
    background-image: url('@/assets/industry.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}
</style>
  