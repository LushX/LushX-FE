<template>
  <div class="article-view" v-if="article">
    <template v-if="article">
      <div class="article-view-header">
        <h1>
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
      if(this.$store.state.list[0] && this.currentType === 'article') {
        let e = this.$store.state.list.filter(item => {
          return item.articleId === this.$route.params.id
        })[0]
        if(!e) {
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
            this.makeInfo('取消收藏成功', 'success')
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
    }
  },

  title () {
    return this.article.title || '文章'
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

    if(this.article.articleId) {
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

<style lang="stylus">
.article-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
  .label
    line-height 2.5em
    color #828282
  .label.collect
    float right
    cursor pointer

.article-view-details
  background-color #fff
  margin-top 10px
  padding 0 2em .5em
  .article-content
    padding 2em .5em
    .image-package
      text-align center
      .image-container
        display inline-block
      img
        width 100%
    a
      color #828282
      &:hover
        color #59BBA5

@media (max-width 600px)
  .article-view-header
    h1
      font-size 1.25em
  .article-view-details
    .article-content
      padding 2em 0
</style>
