<style lang="stylus">
  @import './UserView.styl'
</style>

<template>
  <div class="user-view" v-if="user">
    <div class="user-view-header">
      <h1>
        <a>欢迎 <span>{{ user.username }}</span></a>
        <a class="logout" @click="logout">退出登录</a>
      </h1>
    </div>
    <info :show="showInfo" :msg="infoMsg" :type="infoType"></info>
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
        <span v-show="openVideoCollection && videoCollection.totalElements > 5" class="page-btn">
          <span @click="goVideoPrev">上一页</span>
          <span @click="goVideoNext">下一页</span>
        </span>
      </h2>
      <div v-show="openVideoCollection">
        <div v-if="!videoCollection.totalElements" class="user-view-item">
          <p>暂无收藏</p>
        </div>
        <ul v-else class="collection-list">
          <li v-for="(item, idx) in videoCollectionEpisodes[currentVideoCount]" :key="idx" @click="showDetails(item, 'video')">
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
        <span v-show="openArticleCollection && articleCollection.totalElements > 5" class="page-btn">
          <span @click="goArticlePrev">上一页</span>
          <span @click="goArticleNext">下一页</span>
        </span>
      </h2>
      <div v-show="openArticleCollection">
        <div v-if="!articleCollection.totalElements" class="user-view-item">
          <p>暂无收藏</p>
        </div>
        <ul v-else class="collection-list">
          <li v-for="(item, idx) in articleCollectionEpisodes[currentArticleCount]" :key="idx" @click="showDetails(item, 'article')">
            <i class="fa fa-star" aria-hidden="true"></i>
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Info from '../components/Info.vue'
import Item from '../components/Item.vue'
import Spinner from '../components/Spinner.vue'
import storage from 'store'
import * as ajax from '../api'
import url from '../api/url'
import { chunk } from '../util/filters'

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
      showInfo: false,
      infoType: '',
      infoMsg: '',
      videoCollection: {},
      articleCollection: {},
      articleEpisodesCount: 0,
      videoEpisodesCount: 0
    }
  },

  title () {
    return '个人中心'
  },

  components: {
    Spinner,
    Item,
    Info
  },

  computed: {
    user () {
      return this.$store.state.user || {}
    },

    currentType () {
      return this.$store.state.currentType
    },

    videoCollectionEpisodes () {
      return chunk(this.videoCollection.content, 5)
    },

    articleCollectionEpisodes () {
      return chunk(this.articleCollection.content, 5)
    },

    currentVideoCount () {
      return this.videoEpisodesCount
    },

    currentArticleCount () {
      return this.articleEpisodesCount
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
          this.makeInfo('请输入有效用户名', 'error')
          return false
        } else {
          return true
        }
      } else if (confirmPassword || model.password) {
        if (!model.password.trim().length || model.password.length > 20) {
          this.makeInfo('请输入有效密码', 'error')
          return false
        } else if (model.password !== confirmPassword) {
          this.makeInfo('两次密码不一致', 'error')
          return false
        } else {
          return true
        }
      } else if (!model.username.length && !confirmPassword && !model.password) {
        this.makeInfo('请输入修改内容', 'error')
        return false
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
      storage.remove('authorization')
      storage.remove('user')
      this.$store.dispatch('SET_AUTHORIZATION', { data: data.data.Authorization })
      this.$store.dispatch('SET_USERID', { data: data.data.info.userId })
      this.$store.dispatch('SET_USER', { data: data.data.info })
      this.makeInfo('修改成功', 'success')
    },

    updateUser () {
      this.loading = !this.loading
      this.authorization = this.$store.state.authorization
      if (this.validate(this.model, this.confirmPassword)) {
        ajax.post({
          url: url.UPDATE_USER,
          authorization: this.authorization,
          data: this.model
        }).then(data => {
          data.status === 0
            ? this.saveUser(data)
            : this.makeInfo(data.msg, 'error')
          this.loading = !this.loading
        })
      } else {
        this.loading = !this.loading
      }
    },

    showDetails (item, type) {
      if (type === 'article') {
        storage.remove('itemData')
        this.$store.dispatch('SET_ITEMDATA', { data: item }).then(() => {
          this.$router.push({
            path: `/article/detail/${ item.articleId }`
          })
        })
      }
      if (type === 'video') {
        storage.remove('itemData')
        this.$store.dispatch('SET_ITEMDATA', { data: item }).then(() => {
          this.$router.push({
            path: `/video/detail/${ item.videoId }`
          })
        })
      }
    },

    goVideoPrev () {
      if (this.videoEpisodesCount > 0) {
        this.videoEpisodesCount --
      }
    },

    goVideoNext () {
      if (this.videoEpisodesCount < (this.videoCollectionEpisodes.length - 1)) {
        this.videoEpisodesCount ++
      }
    },

    goArticlePrev () {
      if (this.articleEpisodesCount > 0) {
        this.articleEpisodesCount --
      }
    },

    goArticleNext () {
      if (this.articleEpisodesCount < (this.articleCollectionEpisodes.length - 1)) {
        this.articleEpisodesCount ++
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
    if (this.user.userId) {
      storage.remove('user')
      this.$store.dispatch('SET_USER', { data: this.user })
    } else {
      this.$store.dispatch('SET_USER', { data: null })
    }
  },
}
</script>
