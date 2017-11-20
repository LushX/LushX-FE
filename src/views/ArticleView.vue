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
      </div>
      <div class="article-view-details">
        <div class="article-content" v-html="article.content">
          {{ article.content }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import storage from 'store'

export default {
  name: 'article-view',

  computed: {
    article () {
      if(this.$store.state.list[0]) {
        return this.$store.state.list.filter(item => {
          return item.articleId === this.$route.params.id
        })[0]
      } else {
        return this.$store.state.itemData
      }
    }
  },

  title () {
    return this.article.title || '文章'
  },

  mounted () {
    if(this.article.articleId) {
      storage.remove('itemData')
      storage.set('itemData', this.article)
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
