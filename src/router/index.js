import Vue from 'vue'
import Router from 'vue-router'
import storage from 'store'

Vue.use(Router)

const createListView = type => () => import('../views/CreateListView').then(m => m.default(type))
const createAuthView = type => () => import('../views/CreateAuthView').then(m => m.default(type))
const createUserView = type => () => import('../views/CreateUserView').then(m => m.default(type))
const TypeView = () => import('../views/TypeView.vue')
const ItemView = () => import('../views/ItemView.vue')
const ErrorView = () => import('../views/ErrorView.vue')

export function createRouter () {
  const router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/user/:id', component: createUserView('user') },
      { path: '/auth/:type', component: createAuthView('auth') },
      { path: '/:type/:sort/:page(\\d+)', component: createListView('top') },
      { path: '/:type/:sort/detail/:id(\\d+)', component: ItemView },
      { path: '/error/:code', component: ErrorView },
      { path: '/type', component: TypeView },
      { path: '/', redirect: '/type' }
    ]
  })

  return router
}
