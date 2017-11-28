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
        <router-link :to="`/${ currentType }/top/1`">最热</router-link>
        <router-link :to="`/${ currentType }/new/1`">最新</router-link>
        <router-link v-show="currentType !== 'article'" to="/search">搜索</router-link>
        <router-link to="/type">分类</router-link>
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
      if(this.auth) {
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
  }
}
</script>
