<template>
  <li class="list-item">
    <template v-if="currentType === 'article'">
      <img class="article-poster" :src="item.image">
    </template>
    <template v-else>
      <span class="score">{{ item.score }}</span>
    </template>
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
    <template v-else-if="currentType === 'movie'">
      <span class="label">{{ item.actor | actorLabel }}</span>
    </template>
    <template v-else-if="currentType === 'animation'">
      <span class="label">{{ item.type }}</span>
    </template>
    <template v-else-if="currentType === 'tv'">
      <span class="label">{{ item.type }}</span>
    </template>
  </li>
</template>

<script>
export default {
  name: 'list-item',

  props: ['item'],

  computed: {
    currentType () {
      return this.$store.state.currentType
    },

    currentSort () {
      return this.$route.fullPath.split('/')[2]
    }

    // actors () {
    //   return this.item.actor.split(' ').slice(0, 3)
    // }
  }
}
</script>

<style lang="stylus">
.list-item
  background-color #fff
  padding 20px 30px 20px 80px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  .article-poster
    position: absolute;
    left: 10px;
    width: 60px;
    height: 60px;
    text-align: center;
    margin-top: -9px;
    border-radius 10px
  .score
    color #59BBA5
    font-size 1.1em
    font-weight 700
    position absolute
    top 50%
    left 0
    width 80px
    text-align center
    margin-top -10px
  .label
    padding-right 5px
    font-size .85em
    color #828282
</style>
