<template>
  <div class="error-view">
    <h1>{{ code }}</h1>
    <p v-if="code === '404'" class="msg">您所浏览的页面不存在或者它们已经被移除了。
      <router-link to="/">返回首页</router-link>
      ，或者检查您输入的地址是否有误。
    </p>
    <p v-else class="msg">服务器出错。请稍后再继续访问。</p>
  </div>
</template>

<script>
export default {
  name: 'error-view',

  computed: {
    code () {
      return this.$route.params.code
    }
  },

  title () {
    return this.code
      ? this.code
      : '出错啦'
  }
}
</script>

<style lang="stylus">
.error-view
  margin 30px auto
  padding 20px 30px 20px 80px
  background-color #fff
  box-sizing border-box
  h1
    margin 0
    font-size 3em
  .msg
    list-style-type none
    padding 0
    line-height 2em
  a
    color #59BBA5

@media (max-width 600px)
  .error-view
    padding 20px 30px 20px 30px
</style>
