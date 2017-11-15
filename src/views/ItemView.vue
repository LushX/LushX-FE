<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view-header">
        <a>
          <h1>{{ item.title }}</h1>
        </a><br>
        <span v-for="(label, idx) in item.type" :key="idx" class="label">
          {{ label }}
        </span>
      </div>
      <div class="item-view-details">
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'item-view',

  computed: {
    item () {
      return this.$store.state.movie.top[(this.$route.params.id - 1)]
    }
  },

  title () {
    return this.item.title
  }
}
</script>

<style lang="stylus">
.item-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
  .label
    line-height 2.5em
    color #828282

.item-view-details
  background-color #fff
  margin-top 10px
  padding 0 2em .5em

@media (max-width 600px)
  .item-view-header
    h1
      font-size 1.25em
</style>
