<style lang="stylus">
 @import './AuthView.styl'
</style>

<template>
  <div class="auth-view">
    <div class="auth-view-header">
      <h1>
        <a>{{ authTitle }}</a>
      </h1>
    </div>
    <info :show="showInfo" :type="infoType" :msg="infoMsg"></info>
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
import Info from '../components/Info.vue'
import Spinner from '../components/Spinner.vue'
import * as ajax from '../api'
import url from '../api/url'

export default {
  name: 'auth-view',

  props: {
    type: String
  },

  title () {
    return '鉴权'
  },

  data () {
    return {
      model: {
        username: '',
        password: '',
      },
      confirmPassword: '',
      showInfo: false,
      infoType: '',
      infoMsg: '',
      loading: false
    }
  },

  components: {
    Spinner,
    Info
  },

  computed: {
    authTitle () {
      return this.$route.params.type === 'login'
        ? '登录'
        : '注册'
    }
  },

  methods: {
    validate (model, confirmPassword) {
        if (!model.username.trim().length || model.username.length > 20) {
          this.makeInfo('请输入有效用户名', 'error')
          return false
        } else if (!model.password.trim().length || model.password.length > 20) {
          this.makeInfo('请输入有效密码', 'error')
          return false
        } else if (confirmPassword) {
          if (model.password !== confirmPassword) {
            this.makeInfo('两次密码不一致', 'error')
            return false
          } else {
            return true
          }
        } else {
          return true
        }
    },

    makeInfo (msg, type) {
      this.infoType = type
      this.infoMsg = msg
      this.showInfo = !this.showInfo
      setTimeout(() => {
        this.showInfo = !this.showInfo
      }, 1500)
    },

    saveUser (data) {
      this.$store.dispatch('SET_AUTHORIZATION', { data: data.data.Authorization })
      this.$store.dispatch('SET_USERID', { data: data.data.info.userId })
      this.$router.push({ path: '/movie/top/1' })
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
            data.status === 0
              ? this.saveUser(data)
              : this.makeInfo(data.msg, 'error')
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
            data.status === 0
              ? this.$router.push({ path: '/auth/login' })
              : this.makeInfo(data.msg, 'error')
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
