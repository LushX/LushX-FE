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

<style lang="stylus">
.info
  background-color #FFF
  margin-top 10px
  padding 1.8em 2em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1em
    margin 0
    margin-right .5em

.info-error
  h1
    a
      color #CC3300

.info-success
  h1
    a
      color #59BBA5

.slide-fade-enter-active
  transition all .3s ease

.slide-fade-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter,
.slide-fade-leave-to
  transform translateX(10px)
  opacity 0
</style>
