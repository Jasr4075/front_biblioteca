<template >
  <v-container  >
    <v-row>
      <v-col>
        <h1 class="text-center">
          Cadastro de Usuários
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
            <v-col cols="2">
              <v-text-field
                v-model="id"
                outlined
                disabled
                color="green"
                placeholder="ID do Usuário"
                label="ID do usuário"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="nome"
                outlined
                color="green"
                placeholder="Nome do Usuário"
                label="Nome do usuário"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpfcnpj"
                outlined
                color="green"
                placeholder="CPF/CNPJ"
                label="CPF/CNPJ"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="email"
                outlined
                color="green"
                placeholder="Email"
                label="Email"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="telefone"
                outlined
                color="green"
                placeholder="Telefone"
                label="Telefone"
              ></v-text-field>
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
export default {
  name: 'Index',
  data() {
    return {
      search: null,
      items: [],
      dialog: false,
      nome: null,
      cpfcnpj: null,
      email: null,
      telefone: null,
      id: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Nome',
          value: 'nome',
          align: 'center'
        },
        {
          text: 'CPF/CNPJ',
          value: 'cpfcnpj',
          align: 'center'
        },
        {
          text: 'Email',
          value: 'email',
          align: 'center'
        },
        {
          text: 'Telefone',
          value: 'telefone',
          align: 'center'
        },
        { 
          text: "", 
          value: "actions", 
          filterable: false },
      ]
    }
  },
  async created() {
    await this.getAllUsuarios();
  },
  methods: {
    update(item) {
      this.nome = item.nome;
      this.cpfcnpj = item.cpfcnpj;
      this.email = item.email;
      this.telefone = item.telefone;
      this.id = item.id;
      this.dialog = true;
    },
    async persist() {
      try {
        const request = {
          nome: this.nome,
          cpfcnpj: this.cpfcnpj,
          email: this.email,
          telefone: this.telefone
        };
        if (this.id) {
          await this.$api.post(`/usuario/${this.id}`, request);
        } else {
          await this.$api.post('/usuario', request);
        }
        this.nome = null;
        this.cpfcnpj = null;
        this.email = null;
        this.telefone = null;
        this.id = null;
        this.dialog = false;
        await this.getAllUsuarios();
      } catch (error) {
        return alert('F');
      }
    },
    async getAllUsuarios() {
      try {
        const response = await this.$api.get('/usuario');
        this.items = response;
      } catch (error) {
        return alert('F');
      }
    },
    async destroy(item) {
      try {
        await this.$api.post('/usuario/deletar', { id: item.id });
        await this.getAllUsuarios();
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
