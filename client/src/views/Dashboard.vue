<template>
    <div class="mt-4 p-2">
        <h1 class="text-center titulo">Seja bem viado, {{ this.usuarioLogado.name }}</h1>
    </div>
</template>
<script>
import http from '@/http'
import gb from '@/controller/globalVariables'

export default {
    components: {
    },
    data() {
        return {
            logado: false,
            usuarioLogado: null
        }
    },
    created() {
        // Verificar se há um token salvo no localStorage ou em algum outro local
        const token = localStorage.getItem('token');

        if (token) {
            // Fazer uma chamada à API para obter os detalhes do usuário logado
            // estou tentando pegar pelo id, mas sem sucesso
            http.get("/user", {
                headers: {
                    Authorization: `${token}`
                }
            })
                .then(response => {

                    gb.usuarioGeral = response.data.result;
                    gb.usuarioNome = response.data.result.name;
                    gb.usuarioTipo = response.data.result.typeUser;
                    gb.usuarioLogado = true;

                    this.logado = true;
                })
                .catch(error => {
                    console.error("Erro ao obter usuário logado:", error);
                });
        }
    }
}
</script>
<style></style>
  