function getTitle (vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const serverTitleMixin = {
  created () {
    let title = getTitle(this)
    if (title) {
      switch (title) {
        case 'Top':
          title = '最热'
          break
        case 'New':
          title = '最新'
          break
        case 'User':
          title = '个人中心'
        case 'Play':
          title = '播放'
          break
        default:
          break
      }
      this.$ssrContext.title = `LushX | ${ title }`
    }
  }
}

const clientTitleMixin = {
  mounted () {
    let title = getTitle(this)
    if (title) {
      switch (title) {
        case 'Top':
          title = '最热'
          break
        case 'New':
          title = '最新'
          break
        case 'User':
          title = '个人中心'
          break
        case 'Play':
          title = '播放'
          break
        default:
          break
      }
      document.title = `LushX | ${ title }`
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin
