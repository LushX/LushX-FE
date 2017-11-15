<template>
  <li class="list-item">
    <span class="score">{{ item.score }}</span>
    <span class="title">
      <router-link :to="'/movie/top/' + item.id">{{ item.title }}</router-link>
    </span>
    <br>
    <span class="label" v-for="(label, idx) in item.type" :key="idx">{{ label }}</span>
  </li>
</template>

<script>
export default {
  name: 'list-item',
  props: ['item']
}
</script>

<style lang="stylus">
.list-item
  background-color #fff
  padding 20px 30px 20px 80px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
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
