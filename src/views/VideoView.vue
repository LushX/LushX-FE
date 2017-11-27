<template>
  <div class="video-view" v-if="video">
    <template v-if="douban">
      <div class="video-view-header">
        <h1>
          <a>{{ video.title }}</a>
        </h1><br>
        <span class="label">{{ douban ? douban.original_title : '' }}</span>
      </div>
      <div class="video-view-details">
        <div class="video-poster-wrapper">
          <img class="video-poster" :src="douban ? douban.images.medium : video.image">
          <div class="video-des-wrapper">
              <h2>评分：<span class="label score">{{ douban ? douban.rating.average : '暂无评分' }}</span></h2>
              <h2>地区：<span class="label">{{ video.area }}</span></h2>
              <h2>类型：<span v-for="(genre, idx) in douban.genres" :key="idx" class="label">{{ genre }} </span></h2>
              <h2>年份：<span class="label">{{ douban.year }}</span></h2>
              <h2>导演：
                <span v-if="!douban.directors[0]" class="label">暂无</span>
                <a v-for="(director, idx) in douban.directors" :key="idx" class="label click" :href="director.alt" target="_blank">{{ director.name }} </a>
              </h2>
              <h2>演员：
                <span v-if="!douban.casts[0]" class="label">暂无</span>
                <a v-for="(cast, idx) in douban.casts" :key="idx" class="label click" :href="cast.alt" target="_blank">{{ cast.name }} </a>
              </h2>
          </div>
        </div>
      </div>
      <div class="video-view-details">
        <h2 class="video-view-title">
          简介
        </h2>
        <p class="details-container">{{ video.other || '暂无简介' | cancelSpace}}</p>
      </div>
      <div class="video-view-details">
        <h2 class="video-view-title">
          立即播放
        </h2>
        <router-link class="play-btn" :to="`play/${ video.videoId }`">在线播放</router-link>
      </div>
      <div class="video-view-details">
        <div class="video-copyright">
          <p class="copyright">本页数据来源于<a :href="douban.alt" target="_blank">豆瓣</a></p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="loading">
        <h2>数据加载中...</h2>
      </div>
    </template>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import storage from 'store'

export default {
  name: 'video-view',

  data () {
    return {
      douban: ''
    }
  },

  components: {
    Spinner
  },

  computed: {
    video () {
      if(this.$store.state.list[0]) {
        return this.$store.state.list.filter(item => {
          return item.videoId === this.$route.params.id
        })[0]
      } else {
        return this.$store.state.itemData
      }
    },

    currentType () {
      return this.$store.state.currentType
    }
  },

  title () {
    return this.video.title
  },

  mounted () {
    if(this.video.videoId) {
      storage.remove('itemData')
      this.$store.dispatch('SET_ITEMDATA', { data: this.video })
      this.$store.dispatch('REQ_DOUBAN_DETAILS', { title: this.video.title }).then(() => {
        this.douban = this.$store.state.douban
      })
    } else {
      this.$store.dispatch('SET_ITEMDATA', { data: {} })
      this.$store.dispatch('REQ_DOUBAN_DETAILS', { title: this.video.title }).then(() => {
        this.douban = this.$store.state.douban
      })
    }
  }
}
</script>

<style lang="stylus">
.video-view
  .loading
    margin-top 10em
    text-align center
    h2
      color #828282
      font-weight 400

.video-view-header
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

.video-view-details
  background-color #fff
  .video-poster-wrapper
    padding .4em 0
    display inline-block
    width 100%
    .video-poster
      display inline
      width 10em
    .video-des-wrapper
      float left
      width 50%
      h2
        font-size 1.2em
        font-weight 500
        .label
          color #828282
        .label.click
          color #59BBA5
        .score
          color #EFC14E

  .video-copyright
    margin-top 2em
    margin-bottom 2em
    width 100%
    .copyright
      color #828282
      font-size .8em

.video-view-details
  padding 1em 2em
  margin-top 10px
  .play-btn
    color #59BBA5
  .video-view-title
    font-size 1.2em
    a
      font-weight 400
      color #828182
      cursor pointer

@media (max-width 600px)
  .video-view-header
    h1
      font-size 1.25em
  .video-view-details
    .video-view-title
      font-size 1em
    .video-poster-wrapper
      .video-poster
        width 10em
      .video-des-wrapper
        width 100%
        h1
          font-size 1em
</style>
