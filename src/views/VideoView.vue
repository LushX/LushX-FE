<style lang="stylus">
  @import './VideoView.styl'
</style>

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
      <info :show="showInfo" :msg="infoMsg" :type="infoType"></info>
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
            {{ item.indexs === 0 ? `第 ${ idx + 1 } 集` : `第 ${ item.indexs } 集` }}
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
import Info from '../components/Info.vue'
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
      showInfo: false,
      infoMsg: '',
      infoType: ''
    }
  },

  components: {
    Spinner,
    Info
  },

  computed: {
    video () {
      if(this.$store.state.list[0] && this.currentType !== 'article') {
        let e = this.$store.state.list.filter(item => {
          return item.videoId === this.$route.params.id
        })[0]
        if (!e) {
          return this.$store.state.itemData || {}
        } else {
          return e
        }
      } else {
        return this.$store.state.itemData
      }
    },

    episodes () {
      return chunk(this.video.episodes, 20)
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

    makeInfo (msg, type) {
      this.infoType = type
      this.infoMsg = msg
      this.showInfo = !this.showInfo
      setTimeout(() => {
        this.showInfo = !this.showInfo
      }, 1500)
    },

    collect () {
      if (this.collected) {
        this.collected = !this.collected
        ajax.post({
          url: url.CANCEL_COLLECT_VIDEO + this.video.videoId,
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
          url: url.COLLECT_VIDEO,
          authorization: this.$store.state.authorization,
          data: this.video
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
