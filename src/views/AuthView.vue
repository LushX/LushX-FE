<template>
  <div class="auth-view">
    <div class="auth-view-header">
      <h1>
        <a>{{ authTitle }}</a>
      </h1>
    </div>
    <transition name="slide-fade">
      <div v-if="showErrorMsg" class="auth-view-error">
        <h1>
          <a>
            <i class="fa fa-exclamation" aria-hidden="true"></i>
            {{ errorMsg }}
          </a>
        </h1>
      </div>
    </transition>
    <div class="auth-view-details">
      <div class="auth-view-item">
        <label for="用户名">
          <i class="fa fa-user" aria-hidden="true"></i>
        </label>
        <input v-model="model.username" type="text" placeholder="请输入用户名">
      </div>
      <div class="auth-view-item">
        <label for="密码">
          <i class="fa fa-lock" aria-hidden="true"></i>
        </label>
        <input v-model="model.password" type="password" placeholder="请输入密码">
      </div>
      <div v-if="authTitle === '注册'" class="auth-view-item">
        <label for="确认密码">
          <i class="fa fa-lock" aria-hidden="true"></i>
        </label>
        <input v-model="confirmPassword" type="password" placeholder="请再次输入密码">
      </div>
      <spinner :show="loading"></spinner>
      <div v-show="!loading" class="auth-view-item">
        <a @click="authActive" class="auth-option auth-active">{{ authTitle }}</a> |
        <a @click="authDefault" class="auth-option auth-default">{{ authTitle === '登录' ? '注册' : '登录' }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'store'
import Spinner from '../components/Spinner.vue'
import * as ajax from '../api'
import url from '../api/url'

export default {
  name: 'auth-view',

  props: {
    type: String
  },

  data () {
    return {
      model: {
        username: '',
        password: '',
      },
      confirmPassword: '',
      errorMsg: '',
      showErrorMsg: false,
      loading: false
    }
  },

  components: {
    Spinner
  },

  computed: {
    authTitle () {
      return this.$route.params.type === 'login' ? '登录' : '注册'
    }
  },

  methods: {
    validate (model, confirmPassword) {
        if (!model.username.trim().length || model.username.length > 20) {
          this.makeErrorMsg('请输入有效用户名')
          return false
        } else if (!model.password.trim().length || model.password.length > 20) {
          this.makeErrorMsg('请输入有效密码')
          return false
        } else if (confirmPassword) {
          if (model.password !== confirmPassword) {
            this.makeErrorMsg('两次密码不一致')
            return false
          } else {
            return true
          }
        } else {
          return true
        }
    },

    makeErrorMsg (errorMsg) {
      this.errorMsg = errorMsg
      this.showErrorMsg = !this.showErrorMsg
      setTimeout(() => {
        this.showErrorMsg = !this.showErrorMsg
        this.errorMsg = ''
      }, 1500)
    },

    saveUser (data) {
      this.$store.dispatch('SET_AUTHORIZATION', { data })
      this.$store.dispatch('SET_USERID', { data })      
      storage.set('authorization', data.data.Authorization)
      storage.set('userId', data.data.info.userId)      
      this.$router.push({ path: '/movie/top' })
    },

    authActive () {
      if (this.$route.params.type === 'login') {
        if (this.validate(this.model)) {
          this.loading = !this.loading
          ajax.post({
            url: url.LOGIN,
            data: this.model
          }).then(data => {
            this.loading = !this.loading
            data.status === 0 ? this.saveUser(data) : this.makeErrorMsg(data.msg)
          })
        }
      } else {
        if (this.validate(this.model, this.confirmPassword)) {
          this.loading = !this.loading
          ajax.post({
            url: url.REGISTER,
            data: this.model
          }).then(data => {
            this.loading = !this.loading
            data.status === 0 ? this.$router.push({ path: '/auth/login' }) : this.makeErrorMsg(data.msg)
          })
        }
      }
    },

    authDefault () {
      if (this.$route.params.type === 'login') {
        this.$router.push({ path: '/auth/register' })
      } else {
        this.$router.push({ path: '/auth/login' })
      }
    }
  }
}
</script>

<style lang="stylus">
.auth-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em

.auth-view-error
  background-color #fff
  margin-top 10px
  padding 1.8em 2em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1em
    margin 0
    margin-right .5em
    color #CC3300

.auth-view-details
  background-color #fff
  margin-top 10px
  padding 1em 2em .5em
  .auth-view-item
    padding 1.5em 1em
    label
      font-size 1.2em
      margin 0
      margin-right .5em
    input
      border 0
      border-radius 0
      border-bottom 1px solid rgba(0,0,0,.2)
      outline none
      line-height 2em
      font-size 1.2em
      color: #59BBA5
    .auth-option
      font-size 1.1em
      cursor pointer
    .auth-active
      color #59BBA5
    .auth-default
      color #38485C

.slide-fade-enter-active
  transition all .3s ease

.slide-fade-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter,
.slide-fade-leave-to
  transform translateX(10px)
  opacity 0

@media (max-width 600px)
  .auth-view-header
    h1
      font-size 1.25em
</style>
