<style lang="stylus">
  @import './ArticleView.styl'
</style>

<template>
  <div class="article-view" v-if="article">
    <template v-if="article">
      <div class="article-view-header">
        <h1>
          <i class="fa fa-arrow-circle-o-left" aria-hidden="true" @click="goBack"></i>
          <a>{{ article.title }}</a>
        </h1><br>
        <span class="label">
          @{{ article.author }}
        </span>
        <span class="label">
          {{ article.time }}
        </span>
        <span @click="collect" class="label collect">
          <i class="fa fa-star" aria-hidden="true" :style="collected ? 'color:#EFC14E' : 'color:#828282'"></i>
          {{ collected ? '已收藏' : '收藏'}}
        </span>
      </div>
      <info :show="showInfo" :msg="infoMsg" :type="infoType"></info>
      <div class="article-view-details">
        <div class="article-content" v-html="article.content">
          {{ article.content }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Info from '../components/Info.vue'
import * as ajax from '../api'
import url from '../api/url'
import storage from 'store'

export default {
  name: 'article-view',

  title () {
    return this.article.title || '文章'
  },

  data () {
    return {
      collected: false,
      infoMsg: '',
      infoType: '',
      showInfo: false
    }
  },

  components: {
    Info
  },

  computed: {
    article () {
      if (this.$store.state.list[0] && this.currentType === 'article') {
        let e = this.$store.state.list.filter(item => {
          return item.articleId === this.$route.params.id
        })[0]
        if (!e) {
          return this.$store.state.itemData || {}
        } else {
          return e
        }
      } else {
        return this.$store.state.itemData || {}
      }
    },

    currentType () {
      return this.$store.state.currentType
    }
  },

  methods: {
    collect () {
      if (this.collected) {
        ajax.post({
          url: url.CANCEL_COLLECT_ARTICLE + this.article.articleId,
          authorization: this.$store.state.authorization
        }).then(data => {
          if (data.status === 0) {
            this.makeInfo('已取消收藏', 'warning')
            this.collected = !this.collected
          } else if (data.status === 1) {
            this.makeInfo('请先登录', 'error')
          } else {
            this.makeInfo('网络错误', 'error')
          }
        })
      } else {
        ajax.post({
          url: url.COLLECT_ARTICLE,
          authorization: this.$store.state.authorization,
          data: this.article
        }).then(data => {
          if (data.status === 0) {
            this.makeInfo(data.msg, 'success')
            this.collected = !this.collected
          } else if (data.status === 1) {
            this.makeInfo('请先登录', 'error')
          } else {
            this.makeInfo('网络错误', 'error')
          }
        })
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

    goBack () {
      this.$router.go(-1)
    }
  },

  beforeMount () {
    ajax.get({
      url: url.ISLIKE_ARTICLE,
      authorization: this.$store.state.authorization,
      data: {
        articleId: this.$route.params.id
      }
    }).then(data => {
      data.status === 0
        ? this.collected = data.data.isLike
        : this.collected = false
    })

    if (this.article.articleId) {
      storage.remove('itemData')
      this.$store.dispatch('SET_ITEMDATA', { data: this.article })
      this.article.content = this.article.content.replace(/<div\sclass="image-container-fill".*<\/div>/g, '').replace(/data-original-src/g, 'style="width:100%" src')
    } else {
      this.$store.dispatch('SET_ITEMDATA', { data: {} })
      this.article.content = this.article.content.replace(/<div\sclass="image-container-fill".*<\/div>/g, '').replace(/data-original-src/g, 'style="width:100%" src')
    }
  }
}
</script>
