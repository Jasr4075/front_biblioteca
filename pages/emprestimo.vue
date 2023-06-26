<template>
  <v-container>
    <h1 class="text-center">Cadastro de Empréstimo</h1>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-autocomplete
          v-model="livro"
          :items="livro"
          item-text="titulo"
          item-value="titulo"
          outlined
          dense
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-autocomplete
          v-model="usuario"
          :items="usuarios"
          item-text="nome"
          item-value="id"
          label="Usuário"
          outlined
          dense
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-btn color="green" :disabled="!livro || !usuario" @click="criarEmprestimo">Emprestar</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-card width="900" class="mx-auto">
        <v-card-title>
          <v-data-table :headers="headers" :items="emprestimos"></v-data-table>
        </v-card-title>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      livro: null,
      usuario: null,
      livros: [],
      usuarios: [],
      emprestimos: [],
      headers: [
        { 
        text:  'ID', 
        value: 'id', 
        align: 'center' 
      },
        { 
        text:  'Livro', 
        value: 'livro', 
        align: 'center' 
      },
        { 
        text:  'Usuário', 
        value: 'usuario', 
        align: 'center' 
      },
      ],
    };
  },
  created() {
    this.getAllLivros();
    this.getAllUsuarios();
    this.getAllEmprestimos();
  },
  methods: {
    async criarEmprestimo() {
      try {
        const emprestimo = {
          titulo_id: this.titulo.id,
          usuario_id: this.usuario.id,
        };

        await this.$api.post('/emprestimo', emprestimo);
        await this.$api.post(`/livro/${this.livro.id}`, { disponivel: false });
        await this.$api.post(`/usuario/${this.usuario.id}`, { livro_emprestado: true });

        alert('Empréstimo criado com sucesso');
        this.resetForm();
        this.getAllEmprestimos();
      } catch (error) {
        return alert('F1');
      }
    },
    async getAllLivros() {
      try {
        const response = await this.$api.get('/livro');
        this.livro = response;
      }catch (error) {
        return alert('F2');
      }
    },
    async getAllUsuarios() {
      try {
        const response = await this.$api.get('/usuario');
        this.usuarios = response;
      } catch (error) {
        return alert('F3');
      }
    },
    async getAllEmprestimos() {
      try {
        const response = await this.$api.get('/emprestimo');
        this.emprestimos = response;
      } catch (error) {
        return alert('F');
      }
    },
    resetForm() {
      this.titulo = null;
      this.usuario = null;
    },
  },
};
</script>

<style>
.text-center {
  text-align: center;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
