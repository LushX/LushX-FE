<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="~public/logo-48.png" alt="logo">
        </router-link>
        <router-link :to="`/${ currentType }/top`">最热</router-link>
        <router-link :to="`/${ currentType }/new`">最新</router-link>
        <router-link to="/search">搜索</router-link>
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
      return this.$store.state.currentType || 'movie'
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
    this.$store.dispatch('SET_AUTHORIZATION', { 
      data: {
        data: {
          authorization: ''
        }
      } 
    })

    this.$store.dispatch('SET_USERID', { 
      data: {
        data: {
          info: {
            userId: ''
          }
        }
      } 
    })
  }
}
</script>

<style lang="stylus">
body
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size 15px
  background-color lighten(#eceef1, 30%)
  margin 0
  padding-top 55px
  color #34495e
  overflow-y scroll

a
  color #34495e
  text-decoration none

.header
  background-color #59BBA5
  position fixed
  z-index 999
  height 55px
  top 0
  left 0
  right 0
  .inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 5px
  a
    color rgba(255, 255, 255, .8)
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #fff
    &.router-link-active
      color #fff
      font-weight 400
    &:nth-child(6)
      margin-right 0
  .login
    color #fff
    font-size .9em
    margin 0
    float right
    cursor pointer

.logo
  width 24px
  margin-right 10px
  display inline-block
  vertical-align middle

.view
  max-width 800px
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none
</style>
