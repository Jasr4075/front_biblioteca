<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center">Cadastro de Autor</h1>
        <v-btn
          fab
          small
          color="green"
          class="mx-auto"
          @click="dialog = true"
        >
          <v-icon>mdi-plus</v-icon>
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
          <v-data-table :headers="headers" :items="items" :search="search">
            <template #[`item.actions`]="{ item }">
              <v-icon small color="blue" @click="update(item)">mdi-pencil</v-icon>
              <v-icon small color="red" @click="destroy(item)">mdi-delete</v-icon>
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
                v-model="nome"
                outlined
                color="green"
                placeholder="Nome do Autor"
                label="Nome do autor"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="email"
                outlined
                color="green"
                placeholder="E-mail do Autor"
                label="E-mail do autor"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" class="mx-auto" @click="persist">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      search: null,
      items: [],
      dialog: false,
      nome: null,
      email: null,
      headers: [
        { text: 'ID', 
          value: 'id', 
          align: 'center' 
        },
        { text: 'Nome', 
          value: 'nome', 
          align: 'center' 
        },
        { text: 'E-mail', 
          value: 'email', 
          align: 'center' 
        },
        { text: '', 
          value: 'actions', 
          filterable: false 
        },
      ],
    };
  },
  async created() {
    await this.getAllAuthors();
  },
  methods: {
    update(item) {
      this.nome = item.nome;
      this.email = item.email;
      this.dialog = true;
    },
    async persist() {
      try {
        const request = {
          nome: this.nome,
          email: this.email,
        };
        if (this.id) {
          await this.$api.patch(`/autor/${this.id}`, request);
        } else {
          await this.$api.post(`/autor`, request);
        }
        this.nome = null;
        this.email = null;
        this.id = null;
        this.dialog = false;
        await this.getAllAuthors();
      } catch (error) {
        return alert('F');
      }
    },
    async getAllAuthors() {
      try {
        const response = await this.$api.get('/autor');
        this.items = response;
      } catch (error) {
        return alert('F');
      }
    },
    async destroy(item) {
      try {
        await this.$api.post('/autor/deletar', { id: item.id });
        await this.getAllAuthors();
      } catch (error) {
        return alert('F');
      }
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
