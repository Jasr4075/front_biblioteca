<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center">
          Cadastro de Empréstimo de Livro
        </h1>
        <v-btn
          fab
          small
          color="green"
          class="mx-auto"
          @click="dialog = true"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-card width="900" class="mx-auto">
        <v-row>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
          >
            <template #[`item.actions`]="{ item }">
              <v-icon
                small
                color="blue"
                @click="update(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                color="red"
                @click="destroy(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card-title>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col>
              <v-text-field
                v-model="prazo"
                outlined
                color="green"
                placeholder="Prazo"
                label="Prazo"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="devolucao"
                outlined
                color="green"
                placeholder="Devolução"
                label="Devolução"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="selectedUsuario"
                :items="usuarios"
                item-text="nome"
                item-value="id"
                label="Usuário"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            class="mx-auto"
            @click="persist"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Index',
  data() {
    return {
      search: null,
      items: [],
      dialog: false,
      usuarios: [],
      prazo: null,
      devolucao: null,
      selectedUsuario: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Prazo',
          value: 'prazo',
          align: 'center'
        },
        {
          text: 'Devolução',
          value: 'devolucao',
          align: 'center'
        },
        {
          text: 'Usuário',
          value: 'usuario.nome',
          align: 'center'
        },
        {
          text: " ",
          value: "actions",
          filterable: false
        },
      ]
    }
  },
  async created() {
    await this.getAllEmprestimos();
    await this.getAllUsuarios();
  },
  methods: {
    update(item) {
      this.prazo = item.prazo;
      this.devolucao = item.devolucao;
      this.selectedUsuario = item.usuario.id;
      this.dialog = true;
    },
    async persist() {
      try {
        const request = {
          prazo: this.prazo,
          devolucao: this.devolucao,
          idUsuario: this.selectedUsuario
        };
        if (this.id) {
          await axios.post(`/emprestimo/${this.id}`, request);
        } else {
          await axios.post(`/emprestimo`, request);
        }
        this.prazo = null;
        this.devolucao = null;
        this.selectedUsuario = null;
        this.dialog = false;
        await this.getAllEmprestimos();
      } catch (error) {
        return alert('No fue posible agregar el préstamo');
      }
    },
    async getAllUsuarios() {
      try {
        const response = await axios.get('/usuarios');
        this.usuarios = response.data;
      } catch (error) {
        return alert('F');
      }
    },
    async getAllEmprestimos() {
      try {
        const response = await axios.get('/emprestimo');
        this.items = response.data;
      } catch (error) {
        return alert('F');
      }
    },
    async destroy(item) {
      try {
        await axios.post('/emprestimo/deletar', { id: item.id });
        await this.getAllEmprestimos();
      } catch (error) {
        return alert('F');
      }
    },
  }
}
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
