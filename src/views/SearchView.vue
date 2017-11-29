<style lang="stylus">
  @import './SearchView.styl'
</style>

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
        <input v-model="keyword" type="text" placeholder="请输入视频名称">
        <button @click="search" :disabled="loading">
          <i v-show="!loading" class="fa fa-search" aria-hidden="true"></i>
          <spinner :show="loading"></spinner>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as ajax from '../api'
import url from '../api/url'
import Info from '../components/Info.vue'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'search-view',

  data () {
    return {
      loading: false,
      showInfo: false,
      infoType: '',
      infoMsg: '',
      keyword: ''
    }
  },

  components: {
    Spinner,
    Info
  },

  methods: {
    makeInfo (msg, type) {
      this.infoType = type
      this.infoMsg = msg
      this.showInfo = !this.showInfo
      setTimeout(() => {
        this.showInfo = !this.showInfo
      }, 1500)
    },

    search () {
      this.loading = !this.loading
      ajax.get({
        url: url.VIDEO_SEARCH,
        data: {
          keyword: this.keyword
        }
      }).then(data => {
        data.status === 0
          ? console.log(data)
          : this.makeInfo(data.msg, 'error')
        this.loading = !this.loading
      })
    }
  },

  title () {
    return '搜索'
  }
}
</script>
