import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e716e008 = () => interopDefault(import('../pages/cadastroAutor.vue' /* webpackChunkName: "pages/cadastroAutor" */))
const _7b97f46f = () => interopDefault(import('../pages/cadastroLivro.vue' /* webpackChunkName: "pages/cadastroLivro" */))
const _44fae0c7 = () => interopDefault(import('../pages/cadastroUsuario.vue' /* webpackChunkName: "pages/cadastroUsuario" */))
const _c0aec8be = () => interopDefault(import('../pages/Calculadora.vue' /* webpackChunkName: "pages/Calculadora" */))
const _29d92ffe = () => interopDefault(import('../pages/categorias.vue' /* webpackChunkName: "pages/categorias" */))
const _4ddae6e6 = () => interopDefault(import('../pages/emprestimo.vue' /* webpackChunkName: "pages/emprestimo" */))
const _7685f43d = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cadastroAutor",
    component: _e716e008,
    name: "cadastroAutor"
  }, {
    path: "/cadastroLivro",
    component: _7b97f46f,
    name: "cadastroLivro"
  }, {
    path: "/cadastroUsuario",
    component: _44fae0c7,
    name: "cadastroUsuario"
  }, {
    path: "/Calculadora",
    component: _c0aec8be,
    name: "Calculadora"
  }, {
    path: "/categorias",
    component: _29d92ffe,
    name: "categorias"
  }, {
    path: "/emprestimo",
    component: _4ddae6e6,
    name: "emprestimo"
  }, {
    path: "/home",
    component: _7685f43d,
    name: "home"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
