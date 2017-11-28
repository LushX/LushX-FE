<style lang="stylus">
  @import './Info.styl'
</style>

<template>
  <transition name="slide-fade">
    <div v-if="show" class="info" :class="type === 'error' ? 'info-error' : 'info-success'">
      <h1>
        <a>
          <i class="fa" :class="type === 'error' ? 'fa-exclamation' : 'fa-check-square-o'" aria-hidden="true"></i>
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
