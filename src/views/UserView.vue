<template>
  <div class="user-view" v-if="user">
    <div class="user-view-header">
      <h1>
        <a>欢迎 <span>{{ user.username }}</span></a>
        <a class="logout" @click="logout">退出登录</a>
      </h1>
    </div>
    <transition name="slide-fade">
      <div v-if="showErrorMsg" class="user-view-info user-view-error">
        <h1>
          <a>
            <i class="fa fa-exclamation" aria-hidden="true"></i>
            {{ errorMsg }}
          </a>
        </h1>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="showSuccessMsg" class="user-view-info user-view-success">
        <h1>
          <a>
            <i class="fa fa-check-square-o" aria-hidden="true"></i>
            {{ successMsg }}
          </a>
        </h1>
      </div>
    </transition>
    <div class="user-view-details">
      <h2 class="user-option-title">
        <a @click="openUserPanel = !openUserPanel">{{ openUserPanel ? '[-]' : '[+]' }}</a>
        信息修改（选填）
      </h2>
      <div v-show="openUserPanel">
        <div class="user-view-item">
          <label for="用户名">
            <i class="fa fa-user" aria-hidden="true"></i>
          </label>
          <input v-model="model.username" type="text" placeholder="请输入用户名">
        </div>
        <div class="user-view-item">
          <label for="密码">
            <i class="fa fa-lock" aria-hidden="true"></i>
          </label>
          <input v-model="model.password" type="password" placeholder="请输入密码">
        </div>
        <div class="user-view-item">
          <label for="密码">
            <i class="fa fa-lock" aria-hidden="true"></i>
          </label>
          <input v-model="confirmPassword" type="password" placeholder="请确认密码">
        </div>
        <spinner :show="loading"></spinner>
        <div v-show="!loading" class="user-view-item">
          <a @click="updateUser" class="user-option">保存修改 </a>
        </div>
      </div>
    </div>
    <div class="user-view-details">
      <h2 class="user-option-title">
        <a @click="openVideoCollection = !openVideoCollection">{{ openVideoCollection ? '[-]' : '[+]' }}</a>
        视频收藏
      </h2>
      <div v-show="openVideoCollection">
        <div v-if="!videoCollection.totalElements" class="user-view-item">
          <p>暂无收藏</p>
        </div>
        <ul v-else class="collection-list">
          <li v-for="(item, idx) in videoCollection.content" :key="idx" @click="showDetails(item, 'video')">
            <i class="fa fa-star" aria-hidden="true"></i>
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
    <div class="user-view-details">
      <h2 class="user-option-title">
        <a @click="openArticleCollection = !openArticleCollection">{{ openArticleCollection ? '[-]' : '[+]' }}</a>
        文章收藏
      </h2>
      <div v-show="openArticleCollection">
        <div v-if="!articleCollection.totalElements" class="user-view-item">
          <p>暂无收藏</p>
        </div>
        <ul v-else class="collection-list">
          <li v-for="(item, idx) in articleCollection.content" :key="idx" @click="showDetails(item, 'article')">
            <i class="fa fa-star" aria-hidden="true"></i>
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Item from '../components/Item.vue'
import Spinner from '../components/Spinner.vue'
import storage from 'store'
import * as ajax from '../api'
import url from '../api/url'

export default {
  name: 'user-view',

  data () {
    return {
      model: {
        username: '',
        password: '',
      },
      openUserPanel: false,
      authorization: '',
      openVideoCollection: false,
      openArticleCollection: false,
      confirmPassword: '',
      loading: false,
      errorMsg: '',
      successMsg: '',
      showErrorMsg: false,
      showSuccessMsg: false,
      videoCollection: {},
      articleCollection: {}
    }
  },

  title () {
    return '个人中心'
  },

  components: {
    Spinner,
    Item
  },

  computed: {
    user () {
      return this.$store.state.user || {}
    },

    currentType () {
      return this.$store.state.currentType
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('REMOVE_USER').then(() => {
        this.$router.push({ path: `/${ this.currentType }/top/1` })
      })
    },

    validate (model, confirmPassword) {
      if (model.username.length) {
        if (!model.username.trim().length || model.username.length > 20) {
          this.makeErrorMsg('请输入有效用户名')
          return false
        } else {
          return true
        }
      } else if (confirmPassword || model.password) {
        if (!model.password.trim().length || model.password.length > 20) {
          this.makeErrorMsg('请输入有效密码')
          return false
        } else if (model.password !== confirmPassword) {
          this.makeErrorMsg('两次密码不一致')
          return false
        } else {
          return true
        }
      } else if (!model.username.length && !confirmPassword && !model.password) {
        this.makeErrorMsg('请输入修改内容')
        return false
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

    makeSuccessMsg (successMsg) {
      this.successMsg = successMsg
      this.showSuccessMsg = !this.showSuccessMsg
      setTimeout(() => {
        this.showSuccessMsg = !this.showSuccessMsg
        this.successMsg = ''
      }, 1500)
    },

    saveUser (data) {
      storage.remove('authorization')
      storage.remove('user')
      this.$store.dispatch('SET_AUTHORIZATION', { data: data.data.Authorization })
      this.$store.dispatch('SET_USERID', { data: data.data.info.userId })
      this.$store.dispatch('SET_USER', { data: data.data.info })
      this.makeSuccessMsg('修改成功')
    },

    updateUser () {
      this.loading = !this.loading
      this.authorization = this.$store.state.authorization
      if(this.validate(this.model, this.confirmPassword)) {
        ajax.post({
          url: url.UPDATE_USER,
          authorization: this.authorization,
          data: this.model
        }).then(data => {
          data.status === 0
            ? this.saveUser(data)
            : this.makeErrorMsg(data.msg)
          this.loading = !this.loading
        })
      } else {
        this.loading = !this.loading
      }
    },

    showDetails (item, type) {
      if(type === 'article') {
        storage.remove('itemData')
        this.$store.dispatch('SET_ITEMDATA', { data: item }).then(() => {
          this.$router.push({
            path: `/article/detail/${ item.articleId }`
          })
        })
      }
      if(type === 'video') {
        storage.remove('itemData')
        this.$store.dispatch('SET_ITEMDATA', { data: item }).then(() => {
          this.$router.push({
            path: `/video/detail/${ item.videoId }`
          })
        })
      }
    }
  },

  mounted () {
    storage.remove('user')
    this.$store.dispatch('REQ_USER_INFO', { authorization: storage.get('authorization') }).then(() => {
      this.videoCollection = this.$store.state.user.collection.video
      this.articleCollection = this.$store.state.user.collection.article
    })
  },

  beforeMount () {
    if(this.user.userId) {
      storage.remove('user')
      this.$store.dispatch('SET_USER', { data: this.user })
    } else {
      this.$store.dispatch('SET_USER', { data: null })
    }
  },
}
</script>

<style lang="stylus">
.user-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
    .logout
      float right
      font-size .6em
      font-weight 400
      line-height 2.4em
      color #828182
      cursor pointer
    span
      color #59BBA5

.user-view-info
  background-color #fff
  margin-top 10px
  padding 1.8em 2em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1em
    margin 0
    margin-right .5em

.user-view-error
  h1
    a
      color #CC3300

.user-view-success
  h1
    a
      color #59BBA5

.user-view-details
  background-color #fff
  padding 1em 2em
  margin-top 10px
  .user-option-title
    font-size 1.2em
    a
      font-weight 400
      color #828182
      cursor pointer
  .user-view-item
    padding 1.5em 1em
    p
      color #757475
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
    .user-option
      color #59BBA5
      cursor pointer

.collection-list
  padding-left 1em
  li
    padding-top 1em
    list-style none
    cursor pointer
    i
      color #EFC14E

.slide-fade-enter-active
  transition all .3s ease

.slide-fade-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter,
.slide-fade-leave-to
  transform translateX(10px)
  opacity 0

@media (max-width 600px)
  .user-view-header
    h1
      font-size 1.25em
  .user-view-details
    .user-option-title
      font-size 1em
  .collection-list
    padding-left .5em
</style>
