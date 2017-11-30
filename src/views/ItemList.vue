<style lang="stylus">
  @import 'ItemList.styl'
</style>

<template>
  <div class="list-view">
    <div class="data-list-nav">
      <router-link v-if="page > 1" :to="`/${ currentType }/${ currentSort }/${ (page - 1) }`">&lt; 上一页</router-link>
      <a v-else class="disabled">&lt; 上一页</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="`/${ currentType }/${ currentSort }/${ (page + 1) }`">下一页 &gt;</router-link>
      <a v-else class="disabled">下一页 &gt;</a>
    </div>
    <transition :name="transition">
      <div class="data-list" :key="displayedPage" v-if="displayedPage > 0">
        <transition-group tag="ul" name="item">
          <item v-for="(item, idx) in displayedItems" :key="idx" :item="item">
          </item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
  name: 'item-list',

  props: {
    type: String
  },

  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.$store.state.list
    }
  },

  components: {
    Item
  },

  computed: {
    page () {
       return Number(this.$route.params.page) || 1
    },

    maxPage () {
      return this.$store.state.totalPage
    },

    hasMore () {
      return this.page < this.maxPage
    },

    currentType () {
      return this.$store.state.currentType
    },

    currentSort () {
      return this.$route.fullPath.split('/')[2]
    }
  },

  watch: {
    page (to, from) {
      this.loadItems(to, from)
    }
  },

  methods: {
    loadItems (to = this.page, from = -1) {
      this.$bar.start()
      const model = {
        page: this.$route.params.page - 1,
        size: this.$store.state.itemsPerPage
      }
      this.$store.dispatch('REQ_LIST_DATA', { type: this.type, currentType: this.currentType, model }).then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace(`/${ currentType }/${ this.type }/1`)
          return
        }
        this.transition = from === -1
          ? null
          : to > from
          ? 'slide-left'
          : 'slide-right'
        this.displayedPage = to
        this.displayedItems = this.$store.state.list
        this.$bar.finish()
      })
    }
  },

  beforeMount () {
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
    this.displayedItems = this.$store.state.list
  }
}
</script>
