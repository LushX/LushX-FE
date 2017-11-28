<template>
  <div class="search-view">
    <div class="search-view-header">
      <h1>
        <a>搜索</a>
      </h1>
    </div>
    <info :show="showInfo" :type="infoType" :msg="infoMsg"></info>
    <div class="search-view-details">
      <div class="search-view-item">
        <input type="text" placeholder="请输入视频名称">
        <button @click="search" :disabled="loading">
          <i v-show="!loading" class="fa fa-search" aria-hidden="true"></i>
          <spinner :show="loading"></spinner>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Info from '../components/Info.vue'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'search-view',

  data () {
    return {
      loading: false,
      showInfo: false,
      infoType: '',
      infoMsg: ''
    }
  },

  components: {
    Spinner,
    Info
  },

  methods: {
    search () {
      this.showInfo = true
      this.infoType = 'success'
      this.infoMsg = 'hhhh'
      this.loading = !this.loading
      setTimeout(() => {
        this.showInfo = false
        this.loading = !this.loading
      }, 3000)
    }
  },

  title () {
    return '搜索'
  }
}
</script>

<style lang="stylus">
.search-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em

.search-view-details
  background-color #fff
  padding 1em 1em
  margin-top 10px
  .search-view-item
    padding 1.5em 1em
    button
      border 0
      background #FFF
      outline none
      vertical-align middle
      font-size 1.5em
      margin 0
      margin-left .5em
      cursor pointer
      &:hover
        color #59BBA5
    input
      border 0
      border-radius 0
      border-bottom 1px solid rgba(0,0,0,.2)
      outline none
      line-height 2em
      font-size 1.2em
      color: #59BBA5

@media (max-width 600px)
  .search-view-header
    h1
      font-size 1.25em
</style>
