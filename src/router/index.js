import Vue from 'vue'
import Router from 'vue-router'
import storage from 'store'

Vue.use(Router)

const createPlayerView =   type => () => import('../views/CreatePlayerView').then(m => m.default(type))
const createListView   =   type => () => import('../views/CreateListView').then(m => m.default(type))
const createUserView   =   type => () => import('../views/CreateUserView').then(m => m.default(type))
const ArticleView      =           () => import('../views/ArticleView.vue')
const AboutView        =           () => import('../views/AboutView.vue')
const VideoView        =           () => import('../views/VideoView.vue')
const ErrorView        =           () => import('../views/ErrorView.vue')
const TypeView         =           () => import('../views/TypeView.vue')
const AuthView         =           () => import('../views/AuthView.vue')

export function createRouter () {
  const router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/:type/:sort/detail/play/:id', component: createPlayerView('play') },
      { path: '/:type/top/:page(\\d+)',       component: createListView('top') },
      { path: '/:type/new/:page(\\d+)',       component: createListView('new') },
      { path: '/user/:id',                    component: createUserView('user') },
      { path: '/animation/:sort/detail/:id',  component: VideoView },
      { path: '/article/:sort/detail/:id',    component: ArticleView },
      { path: '/movie/:sort/detail/:id',      component: VideoView },
      { path: '/cam/:sort/detail/:id',        component: VideoView },
      { path: '/tv/:sort/detail/:id',         component: VideoView },
      { path: '/error/:code',                 component: ErrorView },
      { path: '/auth/:type',                  component: AuthView },
      { path: '/about',                       component: AboutView },
      { path: '/type',                        component: TypeView },
      { path: '/',                            redirect: '/type' }
    ]
  })

  return router
}
