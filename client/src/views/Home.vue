<template>
    <div class="mt-4 p-2">
        <h1 class="text-center titulo">Seja bem viado</h1>
    </div>
</template>
<script>
import http from '@/http'

export default{
    components: {
    },
    data(){
        return{
            logado: false,
            usuarioLogado: null
        }
    },
    created() {
        // Verificar se há um token salvo no localStorage ou em algum outro local
        const token = localStorage.getItem("token");
        console.log('token em home', token);

        if (token) {
            // Fazer uma chamada à API para obter os detalhes do usuário logado
            // estou tentando pegar pelo id, mas sem sucesso
            http.get("/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                this.logado = true;
                this.usuarioLogado = response.data;
            })
            .catch(error => {
                console.error(response.data);
                console.error("Erro ao obter usuário logado:", error);
            });
        }
    }
}
</script>
<style>
</style>
  