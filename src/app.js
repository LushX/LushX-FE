import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'

if (process.browser) {
  const VueLazyload = require('vue-lazyload')
  Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '../public/error.png',
    loading: '../public/loading.gif',
    attempt: 1
  })

  const VueVideoPlayer = require('vue-video-player/ssr')
  require('videojs-contrib-hls/dist/videojs-contrib-hls')
  Vue.use(VueVideoPlayer)

  // 引入 Fundebug 监控
  const formatComponentName = (vm) => {
    if (vm.$root === vm) return 'root'
    let name = vm._isVue
      ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag)
      : vm.name
    return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
  }

  Vue.config.errorHandler = (err, vm, info) => {
    let componentName = formatComponentName(vm)
    let propsData = vm.$options && vm.$options.propsData
    fundebug.notifyError(err, {
      metaData:
      {
        componentName: componentName,
        propsData: propsData,
        info: info
      }
    })
  }
}

Vue.mixin(titleMixin)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export function createApp () {
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
