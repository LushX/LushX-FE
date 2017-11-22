<template>
  <div class="video-view" v-if="video">
    <template v-if="video">
      <div class="video-view-header">
        <h1>
          <a>{{ video.title }}</a>
        </h1><br>
        <span class="label">{{ video.alias }}</span>
      </div>
      <div class="video-view-details">
        <div class="video-poster-wrapper">
          <img class="video-poster" :src="video.image">
          <div class="video-des-wrapper">
              <h2>评分：<span class="label score">{{ video.score }}</span></h2>
              <h2>地区：<span class="label">{{ video.area }}</span></h2>
              <h2>年份：<span class="label">{{ video.time }}</span></h2>
              <h2>导演：<span class="label">{{ video.director }}</span></h2>
              <h2>演员：<span class="label">{{ video.actor }}</span></h2>
          </div>
        </div>
        <div class="video-details">
          <h1>简介</h1>
          <p class="details-container">{{ video.other || '暂无简介' }}</p>
        </div>
        <div class="video-play">
          <h1>立即播放</h1>
          <a class="play-btn" :href="video.value" target="_blank">视频源址</a><br>
          <router-link class="play-btn" :to="`play/${ video.videoId }`">在线播放</router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import storage from 'store'

export default {
  name: 'video-view',

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
    } else {
      this.$store.dispatch('SET_ITEMDATA', { data: {} })
    }
  }
}
</script>

<style lang="stylus">
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
  margin-top 10px
  padding 0 2em .5em
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
        .score
          color #59BBA5
  .video-details
    margin-top 2em
    width 100%
    h1
      font-size 1.4em
  .video-play
    margin-top 2em
    margin-bottom 2em
    width 100%
    h1
      font-size 1.4em
    .play-btn
      line-height 2.4em
      color #59BBA5

@media (max-width 600px)
  .video-view-header
    h1
      font-size 1.25em
  .video-view-details
    .video-poster-wrapper
      .video-poster
        width 10em
      .video-des-wrapper
        width 100%
        h1
          font-size 1em
    .video-details
      h1
        font-size 1.1em
    .video-play
      h1
        font-size 1.1em
</style>
