<style lang="stylus">
  @import './Common.styl'
</style>

<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/about" exact>
          <img class="logo" src="~public/logo-48.png" alt="logo">
        </router-link>
        <router-link :to="`/${ currentType }/top/1`" exact>最热</router-link>
        <router-link :to="`/${ currentType }/new/1`" exact>最新</router-link>
        <router-link v-show="currentType !== 'article'" to="/search" exact>搜索</router-link>
        <router-link to="/type" exact>分类</router-link>
        <a class="login" @click="userHandle">{{ auth ? '个人中心' : '登录' }}</a>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import storage from 'store'

export default {
  name: 'app',

  computed: {
    auth () {
      return this.$store.state.authorization || ''
    },

    currentType () {
      return this.$store.state.currentType
    }
  },

  methods: {
    userHandle () {
      if (this.auth) {
        this.$router.push({ path: `/user/${ this.$store.state.userId }` })
      } else {
        this.$router.push({ path: '/auth/login' })
      }
    }
  },

  mounted () {
    this.$store.dispatch('SET_USER', { data: '' })

    this.$store.dispatch('SET_USERID', { data: '' })

    this.$store.dispatch('SET_AUTHORIZATION', { data: '' })

    this.$store.dispatch('SWITCH_TYPE', { type: 'movie' })
  },

  beforeMount () {
    console.log(`
        ██╗     ██╗   ██╗███████╗██╗  ██╗██╗  ██╗
        ██║     ██║   ██║██╔════╝██║  ██║╚██╗██╔╝
        ██║     ██║   ██║███████╗███████║ ╚███╔╝
        ██║     ██║   ██║╚════██║██╔══██║ ██╔██╗
        ███████╗╚██████╔╝███████║██║  ██║██╔╝ ██╗
        ╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
    `)
    console.log('%c👥 代码贡献', 'font-size:15px')
    console.log('%c    Xu ZhenYa https://github.com/zhenyaxu', 'font-size:12px')
    console.log('%c    Trevor    https://huangxizhou.com', 'font-size:12px')
    console.log('%c    Drohe     https://github.com/Drohe', 'font-size:12px')
    console.log('%c    NULL      https://github.com/BENULL', 'font-size:12px')
    console.log('%c✉️ 联系我们', 'font-size:15px')
    console.log('%c    ltobenull@gmail.com', 'font-size:12px')
    console.log('%c🌏 源码地址', 'font-size:15px')
    console.log('%c    https://github.com/LushX', 'font-size:12px')
    console.log('%c⚙️ 问题反馈', 'font-size:15px')
    console.log('%c    https://github.com/LushX/LushX-FE/issues | 前端', 'font-size:12px')
    console.log('%c    https://github.com/LushX/LushX-BE/issues | 后端', 'font-size:12px')
    console.log("\n%c感谢您使用 LushX","color:yellow;font-weight:bold;")
  }
}
</script>
