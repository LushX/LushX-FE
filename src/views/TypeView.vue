<style lang="stylus">
  @import './TypeView.styl'
</style>

<template>
  <div class="type-view">
    <div class="type-view-header">
      <h1>
        <a>选择分类</a>
      </h1>
    </div>
    <div class="type-view-details">
      <ul class="type-list-wrapper">
        <li v-for="(item, idx) in typeList" :key="idx" class="type-list-item">
          <span class="title">{{ item.name }}</span>
          <span class="des">
            <a @click="switchType(item.value)">{{ item.des }}</a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import storage from 'store'

export default {
  name: 'type-view',

  data () {
    return {
      typeList: [
        {
          name: '电影',
          des: '发掘最新最热电影',
          value: 'movie'
        }, {
          name: '动漫',
          des: '最及时的动漫新番，最棒的ACG氛围',
          value: 'animation'
        }, {
          name: '综艺',
          des: '最热综艺等你发现',
          value: 'cam'
        }, {
          name: '电视',
          des: '这里包含国内最新的电视剧',
          value: 'tv'
        }, {
          name: '文章',
          des: '简书 7 日热门',
          value: 'article'
        }
      ]
    }
  },

  computed: {
    code () {
      return this.$route.params.code
    }
  },

  methods: {
    switchType (type) {
      storage.remove('currentType')
      this.$store.dispatch('SWITCH_TYPE', { type })
      this.$router.push({ path: `/${ type }/top/1` })
    }
  },

  title () {
    return '分类'
  }
}
</script>
