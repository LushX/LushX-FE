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
      <transition name="slide-fade">
        <div v-if="showErrorMsg" class="article-view-info article-view-error">
          <h1>
            <a>
              <i class="fa fa-exclamation" aria-hidden="true"></i>
              {{ errorMsg }}
            </a>
          </h1>
        </div>
      </transition>
      <transition name="slide-fade">
        <div v-if="showSuccessMsg" class="article-view-info article-view-success">
          <h1>
            <a>
              <i class="fa fa-check-square-o" aria-hidden="true"></i>
              {{ successMsg }}
            </a>
          </h1>
        </div>
      </transition>
      <div class="article-view-details">
        <div class="article-content" v-html="article.content">
          {{ article.content }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import * as ajax from '../api'
import url from '../api/url'
import storage from 'store'

export default {
  name: 'article-view',

  data () {
    return {
      collected: false,
      errorMsg: '',
      successMsg: '',
      showErrorMsg: false,
      showSuccessMsg: false
    }
  },

  computed: {
    article () {
      if(this.$store.state.list[0]) {
        return this.$store.state.list.filter(item => {
          return item.articleId === this.$route.params.id
        })[0]
      } else {
        return this.$store.state.itemData || {}
      }
    }
  },

  methods: {
    collect () {
      if (this.collected) {
        this.collected = !this.collected
        ajax.post({
          url: url.CANCEL_COLLECT_ARTICLE + this.article.articleId,
          authorization: this.$store.state.authorization
        }).then(data => {
          data.status === 0
            ? this.makeSuccessMsg('取消收藏成功')
            : this.makeErrorMsg('取消收藏失败')
        })
      } else {
        this.collected = !this.collected
        ajax.post({
          url: url.COLLECT_ARTICLE,
          authorization: this.$store.state.authorization,
          data: this.article
        }).then(data => {
          data.status === 0
            ? this.makeSuccessMsg(data.msg)
            : this.makeErrorMsg('收藏失败')
        })
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

.article-view-info
  background-color #fff
  margin-top 10px
  padding 1.8em 2em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1em
    margin 0
    margin-right .5em

.article-view-error
  h1
    a
      color #CC3300

.article-view-success
  h1
    a
      color #59BBA5

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

.slide-fade-enter-active
  transition all .3s ease

.slide-fade-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter,
.slide-fade-leave-to
  transform translateX(10px)
  opacity 0

@media (max-width 600px)
  .article-view-header
    h1
      font-size 1.25em
  .article-view-details
    .article-content
      padding 2em 0
</style>
