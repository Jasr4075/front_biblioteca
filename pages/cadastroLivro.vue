<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center">
          Cadastro de Livros
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
                v-model="nome"
                outlined
                color="green"
                placeholder="Nome do Livro"
                label="Nome do livro"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="sinopse"
                outlined
                color="green"
                placeholder="Sinopse"
                label="Sinopse"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="categoria"
                :items="categorias"
                item-text="nome"
                item-value="id"
                dense
                filled
                solo-inverted
                label="Categoria"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="autor"
                :items="autores"
                item-text="nome"
                item-value="id"
                dense
                filled
                solo-inverted
                label="Autor"
              ></v-autocomplete>
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
      categorias: [],
      autores: [],
      nome: null,
      sinopse: null,
      categoria: null,
      autor: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Nome',
          value: 'titulo',
          align: 'center'
        },
        {
          text: 'Sinopse',
          value: 'sinopse',
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
    await this.getAllLivros();
    await this.getAllCategorias();
    await this.getAllAutores();
  },
  methods: {
    update(item) {
      this.titulo = item.nome;
      this.sinopse = item.sinopse;
      this.categoria = item.categoria;
      this.autor = item.autor;
      this.id = item.id;
      this.dialog = false;
    },
    async persist() {
      try {
        const request = {
          titulo: this.nome,
          sinopse: this.sinopse,
          idCategoria: this.categoria,
          idAutor: this.autor,
        };
        if (this.id) {
          await this.$api.post(`/livro/${this.id}`, request);
        } else {
          await this.$api.post('/livro', request);
        }
        this.titulo = null;
        this.sinopse = null;
        this.categoria = null;
        this.autor = null;
        this.id = null;
        this.dialog = false;
        await this.getAllLivros();
      } catch (error) {
        return alert('No fue posible salvar el libro');
      }
    },

    async getAllCategorias() {
      try {
        const response = await this.$api.get('/categorias');
        this.categorias = response;
      } catch (error) {
        return alert('F');
      }
    },

    async getAllLivros() {
      try {
        const response = await this.$api.get('/livro');
        this.items = response;
      } catch (error) {
        return alert('F');
      }
    },

    async getAllAutores() {
      try {
        const response = await this.$api.get('/autor');
        this.autores = response;
      } catch (error) {
        return alert('F');
      }
    },

    async destroy(item) {
      try {
        await this.$api.post('/livro/deletar', { id: item.id });
        await this.getAllLivros();
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
