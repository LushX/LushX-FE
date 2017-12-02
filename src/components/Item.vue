<style lang="stylus">
  @import './Item.styl'
</style>

<template>
  <li class="list-item">
    <img class="poster" :src="item.image | imgUrl">
    <span class="title">
      <router-link
        :to="`/${ currentType }/${ currentSort }/detail/${ item.articleId || item.videoId }`">
        {{ item.title }}
      </router-link>
    </span>
    <br>
    <template v-if="currentType === 'article'">
      <span class="label">{{ item.time }}</span>
    </template>
    <template v-else>
      <span class="label">{{ item.type }}</span>
    </template>
  </li>
</template>

<script>
import errorImg from '../../public/error.png'

export default {
  name: 'list-item',

  props: ['item'],

  serverCacheKey: props => props.item.articleId || props.item.videoId + '::' + props.item.last_updated,

  computed: {
    currentType () {
      return this.$store.state.currentType
    },

    currentSort () {
      return this.$route.fullPath.split('/')[2]
    }
  },

  mounted () {
    let allPostImg = Object.values(document.getElementsByClassName('poster'))
    allPostImg.forEach(item => {
      item.onerror = () => {
        item.src = errorImg
        item.alt = '图片来源错误'
      }
    })
  }
}
</script>
