<style lang="stylus">
  @import './Info.styl'
</style>

<template>
  <transition name="slide-fade">
    <div v-if="show && type === 'error'" class="info info-error">
      <h1>
        <a>
          <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          {{ msg }}
        </a>
      </h1>
    </div>
    <div v-else-if="show && type === 'success'" class="info info-success">
      <h1>
        <a>
          <i class="fa fa-check-square-o" aria-hidden="true"></i>
          {{ msg }}
        </a>
      </h1>
    </div>
    <div v-if="show && type === 'warning'" class="info info-warning">
      <h1>
        <a>
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          {{ msg }}
        </a>
      </h1>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'info',
  props: {
    show: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'success'
    },

    msg: {
      type: String
    }
  }
}
</script>
