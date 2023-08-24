<template>
    <div class="mt-4 p-2">
        <h1 class="text-center titulo">Seja bem vindo</h1>
    </div>
</template>
<script>
import gb from '@/controller/globalVariables'

export default{
    components: {
    },
    data(){
        return{
        }
    },
    created(){
        // if (!gb.usuarioLogado) {
        //     alert('Você ainda não fez login, faça!');
        // }
    }
    // created() {
    //     // Verificar se há um token salvo no localStorage ou em algum outro local
    //     const token = localStorage.getItem('token');

    //     if (token) {
    //         // Fazer uma chamada à API para obter os detalhes do usuário logado
    //         // estou tentando pegar pelo id, mas sem sucesso
    //         http.get("/user", {
    //             headers: {
    //                 Authorization:`${token}`
    //             }
    //         })
    //         .then(response => {
    //             this.logado = true;
    //             this.usuarioLogado = response.data.objClient;
    //             console.log('user: ', this.usuarioLogado);
    //         })
    //         .catch(error => {
    //             console.error("Erro ao obter usuário logado:", error);
    //         });
    //     }
    // }
}
</script>
<style>
</style>
  