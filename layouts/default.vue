<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/home',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Categorias',
          to: '/categorias',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Cadastrar usuario',
          to: '/cadastroUsuario',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Cadastrar autor',
          to: '/cadastroAutor',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Emprestimo',
          to: '/emprestimo',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Cadastrar livro',
          to: '/cadastroLivro',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'calculadora',
          to: '/calculadora',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

<style>
</style>
