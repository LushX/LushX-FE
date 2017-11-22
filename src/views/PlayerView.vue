<template>
  <div class="player-view">
    <div class="player-view-header">
      <h1>
        <a>正在播放：<span>{{ resource.title }}</span></a>
      </h1>
    </div>
    <div class="player-view-details">
      <div class="video-container">
        <video class="video" controls="" autoplay="" name="media">
          <source :src="videoUrl" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'store'

export default {
  name: 'player-view',

  computed: {
    resource () {
      return this.$store.state.itemData
    },
    videoUrl () {
      return this.$store.state.videoUrl
    }
  },

  title () {
    return this.resource.title
  }
}
</script>

<style lang="stylus">
.player-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
    span
      color #59BBA5

.player-view-details
  background-color #fff
  padding 1em 2em
  margin-top 10px
  .video-container
    width 100%
    .video
      width 100%

@media (max-width 600px)
  .player-view-header
    h1
      font-size 1.25em
.player-view-details
  padding 1em 1em
  .video-container
    width 100%
    .video
      width 100%
</style>
