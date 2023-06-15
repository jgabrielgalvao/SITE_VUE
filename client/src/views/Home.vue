<template>
    <div class="mt-4 p-2">
        <v-img aspect-ratio="16/9" cover src="@/images/industry.png"></v-img>
        <h1 class="overlay-text">Seja bem viado</h1>
        <div v-if="!logado">
            <v-card>
                <p>faça seu login</p>
            </v-card>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            logado: false
        }
    }
}
</script>
<style>
.overlay-text {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: black;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
  