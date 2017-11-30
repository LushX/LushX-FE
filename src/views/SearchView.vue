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
        <input v-model="keyword" type="text" placeholder="请输入视频名称" @keyup.enter="search">
        <button @click="search" :disabled="loading">
          <i v-show="!loading" class="fa fa-search" aria-hidden="true"></i>
          <spinner :show="loading"></spinner>
        </button>
      </div>
    </div>
    <div v-show="showSearchResult" class="search-view-details">
      <h2 class="search-view-item-title">
        <a @click="openSearchResult = !openSearchResult">{{ openSearchResult ? '[-]' : '[+]' }}</a>
        结果
        <span v-show="openSearchResult && searchResultPagination.length > 1" class="page-btn">
          <span @click="goResultPrev">上一页</span>
          <span @click="goResultNext">下一页</span>
        </span>
      </h2>
      <div v-show="openSearchResult">
        <div v-if="!searchResult[0]" class="search-view-item">
          <p>暂无结果</p>
        </div>
        <ul v-else class="result-list">
          <li v-for="(item, idx) in searchResultPagination[resultCount]" :key="idx" @click="showDetails(item)">
            <i>{{ (resultCount * 5) + (idx + 1) }}</i>
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'store'
import * as ajax from '../api'
import url from '../api/url'
import Info from '../components/Info.vue'
import Spinner from '../components/Spinner.vue'
import { chunk } from '../util/filters'

export default {
  name: 'search-view',

  data () {
    return {
      loading: false,
      showInfo: false,
      infoType: '',
      infoMsg: '',
      keyword: '',
      openSearchResult: true,
      showSearchResult: false,
      searchResult: [],
      resultCount: 0
    }
  },

  components: {
    Spinner,
    Info
  },

  computed: {
    searchResultPagination () {
      return chunk(this.searchResult, 5)
    }
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
      if (this.keyword) {
        this.makeInfo('搜索需要花费一些时间', 'warning')
        this.showSearchResult = !this.showSearchResult
        ajax.get({
          url: url.VIDEO_SEARCH,
          data: {
            keyword: this.keyword
          }
        }).then(data => {
          data.status === 0
            ? this.searchResult = data.data
            : this.makeInfo(data.msg, 'error')
          this.loading = !this.loading
          this.showSearchResult = !this.showSearchResult
        })
      } else {
        this.makeInfo('输入不能为空', 'error')
        this.loading = !this.loading
      }
    },

    goResultPrev () {
      if (this.resultCount > 0) {
        this.resultCount --
      }
    },

    goResultNext () {
      if (this.resultCount < (this.searchResultPagination.length - 1)) {
        this.resultCount ++
      }
    },

    showDetails (item) {
        storage.remove('itemData')
        this.$store.dispatch('SET_ITEMDATA', { data: item }).then(() => {
          this.$router.push({
            path: `/video/detail/${ item.videoId }`
          })
        })
    }
  },

  title () {
    return '搜索'
  }
}
</script>
