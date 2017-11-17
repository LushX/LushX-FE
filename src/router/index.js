import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const createListView = type => () => import('../views/CreateListView').then(m => m.default(type))
const createAuthView = type => () => import('../views/CreateAuthView').then(m => m.default(type))
const TypeView = () => import('../views/TypeView.vue')
const ItemView = () => import('../views/ItemView.vue')
const ErrorView = () => import('../views/ErrorView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/auth/:type', component: createAuthView('auth') },      
      { path: '/:type/top/:page(\\d+)', component: createListView('top') },
      { path: '/:type/top/detail/:id(\\d+)', component: ItemView },
      { path: '/error/:code', component: ErrorView },
      { path: '/type', component: TypeView },      
      { path: '/', redirect: '/movie/top' }
    ]
  })
}
