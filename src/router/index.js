import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
// const createListView_test = () => import('../views/CreateListView_test')
const itemList_test = () => import('../views/ItemList_test.vue')

const ItemView = () => import('../views/ItemView.vue')
const UserView = () => import('../views/UserView.vue')
const ErrorView = () => import('../views/ErrorView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      // { path: '/test', component: createListView_test('test') },
      { path: '/test', component: itemList_test },      
      
      { path: '/top/:page(\\d+)?', component: createListView('top') },
      { path: '/new/:page(\\d+)?', component: createListView('new') },
      { path: '/show/:page(\\d+)?', component: createListView('show') },
      { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      { path: '/job/:page(\\d+)?', component: createListView('job') },
      { path: '/item/:id(\\d+)', component: ItemView },
      { path: '/user/:id', component: UserView },
      { path: '/error/:code', component: ErrorView },      
      { path: '/', redirect: '/top' }
    ]
  })
}
