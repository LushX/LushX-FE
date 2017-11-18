<template>
  <div class="user-view">
    <div class="user-view-header">
      <h1>
        <a>{{ user }}</a>
      </h1>
    </div>
    <div class="user-view-details">
      <div class="user-view-item">
        <label for="用户名">
          <i class="fa fa-user" aria-hidden="true"></i>
        </label>
        <input type="text" placeholder="请输入用户名">
      </div>
      <div class="user-view-item">
        <label for="密码">
          <i class="fa fa-lock" aria-hidden="true"></i>
        </label>
        <input type="password" placeholder="请输入密码">
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'store'

export default {
  name: 'user-view',

  title () {
    return '个人中心'
  },

  computed: {
    user () {
      return this.$store.state.userId
    }
  },

  data() {
    return {
      
    }
  },

  methods: {
    test() {
      console.log(this.user)
    }
  }
}
</script>

<style lang="stylus">
.user-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em

.user-view-details
  background-color #fff
  margin-top 10px
  .user-view-item
    padding 1.5em 1em
    label
      font-size 1.2em
      margin 0
      margin-right .5em
    input
      border 0
      border-radius 0
      border-bottom 1px solid rgba(0,0,0,.2)
      outline none
      line-height 2em
      font-size 1.2em
      color: #59BBA5

@media (max-width 600px)
  .type-view-header
    h1
      font-size 1.25em
</style>
