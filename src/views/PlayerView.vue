<style lang="stylus">
  @import './PlayerView.styl'
</style>

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
