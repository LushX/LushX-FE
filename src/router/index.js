import Vue from 'vue'
import Router from 'vue-router'
import storage from 'store'

Vue.use(Router)

const createListView = type => () => import('../views/CreateListView').then(m => m.default(type))
const createAuthView = type => () => import('../views/CreateAuthView').then(m => m.default(type))
const createUserView = type => () => import('../views/CreateUserView').then(m => m.default(type))
const createPlayerView = type => () => import('../views/CreatePlayerView').then(m => m.default(type))
const TypeView = () => import('../views/TypeView.vue')
const ArticleView = () => import('../views/ArticleView.vue')
const VideoView = () => import('../views/VideoView.vue')
const ErrorView = () => import('../views/ErrorView.vue')

export function createRouter () {
  const router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/user/:id', component: createUserView('user') },
      { path: '/auth/:type', component: createAuthView('auth') },
      { path: '/:type/top/:page(\\d+)', component: createListView('top') },
      { path: '/:type/new/:page(\\d+)', component: createListView('new') },
      { path: '/article/:sort/detail/:id', component: ArticleView },
      { path: '/movie/:sort/detail/:id', component: VideoView },
      { path: '/animation/:sort/detail/:id', component: VideoView },
      { path: '/cam/:sort/detail/:id', component: VideoView },
      { path: '/tv/:sort/detail/:id', component: VideoView },
      { path: '/:type/:sort/detail/play/:id', component: createPlayerView('play') },      
      { path: '/error/:code', component: ErrorView },
      { path: '/type', component: TypeView },
      { path: '/', redirect: '/type' }
    ]
  })

  return router
}
