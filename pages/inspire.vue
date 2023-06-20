<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center">
          Cadastro de Categorias
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
                placeholder="ID Da Categoria"
                label="ID da categoria"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="nome"
                outlined
                color="green"
                placeholder="Nome Da Categoria"
                label="Nome da categoria"
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
      id: null,
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'center'
        },
        {
          text: 'nome',
          value: 'nome',
          align: 'center'
        },
        { text: "", value: "actions", filterable: false },
      ]
    }
  },
  async created() {
    await this.getAllCategories();
  },
  methods: {
    update(item) {
      this.nome = item.nome;
      this.id = item.id;
      this.dialog = true;
    },
    async persist() {
      try {
        const request = {
          nome: this.nome
        };
        if (this.id) {
          await this.$api.patch(`/categorias/${this.id}`, request);
        } else {
          await this.$api.post(`/categorias/`, request);
        }
        this.nome = null;
        this.id = null;
        this.dialog = false;
        await this.getAllCategories();
      } catch (error) {
        return alert('F');
      }
    },
    async getAllCategories() {
      try {
        const response = await this.$api.get('/categorias');
        this.items = response;
      } catch (error) {
        return alert('F');
      }
    },
    async destroy(item) {
      try {
        await this.$api.post('/categorias/deletar', { id: item.id });
        await this.getAllCategories();
      } catch (error) {
        return alert('F');
      }
    },
    // async update(item) {
    //   try {
    //     const response = await this.$api.get(`/categorias/${item.id}`);
    //     this.nome = response.nome;
    //     this.id = response.id;
    //     this.dialog = true;
    //   } catch (error) {
    //     return alert('F');
    //   }
    // },



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
