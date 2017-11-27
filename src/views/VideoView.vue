<template>
  <div class="video-view" v-if="video">
    <template v-if="douban">
      <div class="video-view-header">
        <h1>
          <a>{{ video.title }}</a>
        </h1><br>
        <span class="label">{{ douban ? douban.original_title : '' }}</span><br>
        <span @click="collect" class="label collect">
          <i class="fa fa-star" aria-hidden="true" :style="collected ? 'color:#EFC14E' : 'color:#828282'"></i>
          {{ collected ? '已收藏' : '收藏'}}
        </span>
      </div>
      <transition name="slide-fade">
        <div v-if="showErrorMsg" class="video-view-info video-view-error">
          <h1>
            <a>
              <i class="fa fa-exclamation" aria-hidden="true"></i>
              {{ errorMsg }}
            </a>
          </h1>
        </div>
      </transition>
      <transition name="slide-fade">
        <div v-if="showSuccessMsg" class="video-view-info video-view-success">
          <h1>
            <a>
              <i class="fa fa-check-square-o" aria-hidden="true"></i>
              {{ successMsg }}
            </a>
          </h1>
        </div>
      </transition>
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
          <a @click="openDetails = !openDetails">{{ openDetails ? '[-]' : '[+]' }}</a>
          简介
        </h2>
        <div v-show="openDetails">
          <p class="details-container">{{ video.other || '暂无简介' | cancelSpace}}</p>
        </div>
      </div>
      <div class="video-view-details">
        <h2 class="video-view-title">
          <a @click="openEpisodes = !openEpisodes">{{ openEpisodes ? '[-]' : '[+]' }}</a>
          播放
          <span v-show="openEpisodes" class="page-btn">
            <span @click="goPrev">上一页</span>
            <span @click="goNext">下一页</span>
          </span>
        </h2>
        <div v-show="openEpisodes">
          <router-link v-for="(item, idx) in episodes[currentCount]" :key="idx" class="play-btn" :to="`play/${ item.episodeId }`">
            {{ item.index === 0 ? `第 ${ idx + 1 } 集` : `第 ${ item.index } 集` }}
          </router-link>
        </div>
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
import * as ajax from '../api'
import url from '../api/url'
import Spinner from '../components/Spinner.vue'
import storage from 'store'
import { chunk } from '../util/filters'

export default {
  name: 'video-view',

  data () {
    return {
      douban: '',
      episodesCount: 0,
      openEpisodes: true,
      openDetails: true,
      collected: false,
      errorMsg: '',
      successMsg: '',
      showErrorMsg: false,
      showSuccessMsg: false
    }
  },

  components: {
    Spinner
  },

  computed: {
    video () {
      if(this.$store.state.list[0] && this.currentType !== 'article') {
        return this.$store.state.list.filter(item => {
          return item.videoId === this.$route.params.id
        })[0]
      } else {
        return this.$store.state.itemData
      }
    },

    episodes () {
      return chunk(this.video.episodesByVideoId, 20)
    },

    currentType () {
      return this.$store.state.currentType
    },

    currentCount () {
      return this.episodesCount
    }
  },

  methods: {
    goPrev () {
      if(this.episodesCount > 0) {
        this.episodesCount --
      }
    },

    goNext () {
      if(this.episodesCount < (this.episodes.length - 1)) {
        this.episodesCount ++
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

    collect () {
      if (this.collected) {
        this.collected = !this.collected
        ajax.post({
          url: url.CANCEL_COLLECT_VIDEO + this.video.videoId,
          authorization: this.$store.state.authorization
        }).then(data => {
          data.status === 0
            ? this.makeSuccessMsg('取消收藏成功')
            : this.makeErrorMsg('取消收藏失败')
        })
      } else {
        this.collected = !this.collected
        ajax.post({
          url: url.COLLECT_VIDEO,
          authorization: this.$store.state.authorization,
          data: this.video
        }).then(data => {
          data.status === 0
            ? this.makeSuccessMsg(data.msg)
            : this.makeErrorMsg('收藏失败')
        })
      }
    }
  },

  title () {
    return this.video.title || '视频详情'
  },

  beforeMount () {
    ajax.get({
      url: url.ISLIKE_VIDEO,
      authorization: this.$store.state.authorization,
      data: {
        videoId: this.$route.params.id
      }
    }).then(data => {
      data.status === 0
        ? this.collected = data.data.isLike
        : this.collected = false
    })

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

.video-view-info
  background-color #fff
  margin-top 10px
  padding 1.8em 2em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1em
    margin 0
    margin-right .5em

.video-view-error
  h1
    a
      color #CC3300

.video-view-success
  h1
    a
      color #59BBA5

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
    padding-top 1em
    width 8em
    color #59BBA5
    display inline-block
  .video-view-title
    font-size 1.2em
    a
      font-weight 400
      color #828182
      cursor pointer
    .page-btn
      float right
    span
      padding-left 2em
      cursor pointer
      font-size .9em

.slide-fade-enter-active
  transition all .3s ease

.slide-fade-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter,
.slide-fade-leave-to
  transform translateX(10px)
  opacity 0

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
