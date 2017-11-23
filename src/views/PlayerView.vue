<template>
  <div class="player-view">
    <div class="player-view-header">
      <h1>
        <a>正在播放：<span>{{ resource.title }}</span></a>
      </h1>
    </div>
    <div class="player-view-details">
      <div class="video-container">
        <div class="video-player-box"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ready="playerReadied"
            @statechanged="playerStateChanged($event)"
            v-video-player:myVideoPlayer="playerOptions">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'store'

export default {
  name: 'player-view',

  data () {
    return {
      playerOptions: {
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "application/x-mpegURL",
          src: "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8"
        }],
        poster: "",
      }
    }
  },

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
  },

  methods: {
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
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

.video-js
  :focus
      outline: 0

.video-js .vjs-big-play-button
    top 50%
    left 50%
    transform translate(-50%, -50%)


.video-js
    width 100%
    height 30em

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
  .video-js
    width 100%
    height 16em
</style>
