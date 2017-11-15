import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const ItemView = () => import('../views/ItemView.vue')
const ErrorView = () => import('../views/ErrorView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/movie/top', component: createListView('top') },
      { path: '/movie/top/:id(\\d+)', component: ItemView },
      { path: '/error/:code', component: ErrorView },
      { path: '/', redirect: '/movie/top' }
    ]
  })
}
