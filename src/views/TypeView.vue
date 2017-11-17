<template>
  <div class="type-view">
    <div class="type-view-header">
      <a>
        <h1>选择分类</h1>
      </a>
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
      this.$store.dispatch('SWITCH_TYPE', { type })
    }
  },

  title () {
    return '分类'
  }
}
</script>

<style lang="stylus">
.type-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em

.type-view-details
  background-color #fff
  margin-top 10px

.type-list-wrapper
  list-style-type none
  padding 0
  margin 0
  .type-list-item
    background-color #fff
    padding 34px 30px 34px 80px
    border-bottom 1px solid #eee
    position relative
    line-height 20px
    .title
      color #59BBA5
      font-size 1.1em
      font-weight 700
      position absolute
      top 50%
      left 0
      width 80px
      text-align center
      margin-top -10px
    .des
      a
        cursor pointer

@media (max-width 600px)
  .type-view-header
    h1
      font-size 1.25em
</style>
