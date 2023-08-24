<template>
    <div class="mt-4 p-2">
        <h1 class="text-center titulo">Seja bem vindo ao dash, {{ this.name }}</h1>
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
            name: null,
        }
    },
    created() {
        // Verificar se há um token salvo no localStorage ou em algum outro loca

        if (gb.token) {
            http.get("/user", {
                headers: {
                    Authorization: `${gb.token}`
                }
            })
                .then(response => {

                    gb.usuarioGeral = response.data.objClient;
                    gb.usuarioNome = response.data.objClient.name;
                    gb.usuarioTipo = response.data.objClient.typeUser;

                    this.name = gb.usuarioNome;

                    console.log("Usuario geral: ", gb.usuarioGeral);
                    console.log("Usuario nome: ", gb.usuarioNome);
                    console.log("Usuario tipo: ", gb.usuarioTipo);
                    console.log("Usuario está logado? ", gb.usuarioLogado);
                })
                .catch(error => {
                    console.error("Erro ao obter usuário logado:", error);
                });
        }
    }
}
</script>
<style></style>
  