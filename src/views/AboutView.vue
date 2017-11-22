<template>
  <div class="about-view">
    <div class="about-view-header">
      <h1>
        <a>关于</a>
      </h1>
    </div>
    <div class="about-view-details">
      <h2 class="about-view-title">
        <i class="fa fa-users" aria-hidden="true"></i>
        代码贡献
      </h2>
      <a class="about-link" href="//github.com/BENULL" target="_blank">NULL</a><br>
      <a class="about-link" href="//github.com/zhenyaxu" target="_blank">Xu ZhenYa</a><br>
      <a class="about-link" href="//github.com/Drohe" target="_blank">Drohe</a><br>
      <a class="about-link" href="//huangxizhou.com" target="_blank">Trevor</a>
    </div>
    <div class="about-view-details">
      <h2 class="about-view-title">
        <i class="fa fa-envelope" aria-hidden="true"></i>
        联系我们
      </h2>
      <a class="about-link" href="mailto:ltobenull@gmail.com" target="_blank">ltobenull@gmail.com</a>
    </div>
    <div class="about-view-details">
      <h2 class="about-view-title">
        <i class="fa fa-github" aria-hidden="true"></i>
        源码地址
      </h2>
      <a class="about-link" href="//github.com/LushX" target="_blank">LushX</a>
    </div>
    <div class="about-view-details">
      <h2 class="about-view-title">
        <i class="fa fa-comments" aria-hidden="true"></i>
        问题反馈
      </h2>
      <a class="about-link" href="//github.com/LushX/LushX-FE/issues" target="_blank">issue | 前端</a><br>
      <a class="about-link" href="//github.com/LushX/LushX-BE/issues" target="_blank">issue | 后端</a>
    </div>
  </div>
</template>

<script>
import storage from 'store'

export default {
  name: 'about-view',

  title () {
    return '关于'
  }
}
</script>

<style lang="stylus">
.about-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em

.about-view-details
  background-color #fff
  padding 1em 2em
  margin-top 10px
  .about-view-title
    font-size 1.2em
    a
      font-weight 400
      color #828182
      cursor pointer
  .about-link
    line-height 2em
    color #59BBA5

@media (max-width 600px)
  .about-view-header
    h1
      font-size 1.25em
  .about-view-details
    .about-view-title
      font-size 1em
</style>
