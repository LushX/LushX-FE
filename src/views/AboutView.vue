<style lang="stylus">
  @import './AboutView.styl'
</style>

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
