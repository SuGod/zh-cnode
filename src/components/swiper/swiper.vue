<template>
  <div class="slider">
    <div class="swiper" :style="{height: xheight}">
      <slot></slot>

      <div
        class="swiper-item"
        v-for="(item, index) in list"
        @click="clickListItem(item)"
        :data-index="index"
        :key="index"
      >
        <a href="javascript:">
          <div class="swiper-img" :style="{backgroundImage: buildBackgroundUrl(item)}"></div>
          <p class="swiper-desc" v-if="showDescMask">{{ item.title }}</p>
        </a>
      </div>

      <div
        v-if="listTwoLoopItem.length > 0"
        class="swiper-item swiper-item-clone"
        v-for="(item, index) in listTwoLoopItem"
        @click="clickListItem(item)"
        :data-index="index"
        :key="index"
      >
        <a href="javascript:">
          <div class="swiper-img" :style="{backgroundImage: buildBackgroundUrl(item)}"></div>
          <p class="swiper-desc" v-if="showDescMask">{{ item.title }}</p>
        </a>
      </div>

    </div>
    <div :class="[dotsClass, 'indicator', `indicator-${dotsPosition}`]" v-show="showDots">
      <a href="javascript:" v-for="key in length" :key="key">
        <i class="icon-dot" :class="{'active': key - 1 === current}"></i>
      </a>
    </div>
  </div>
</template>

<script>
import Swiper from './swiper.js'

export default {
  name: 'swiper',
  created () {
    this.index = this.value || 0
    if (this.index) {
      this.current = this.index
    }
  },
  mounted () {
    this.hasTwoLoopItem()
    this.$nextTick(() => {
      if (!(this.list && this.list.length === 0)) {
        this.render(this.index)
      }
      this.xheight = this.getHeight()
      // this.xheight = this.Height
      this.$emit('on-get-height', this.xheight)
    })
  },
  methods: {
    _go (url, $router) {
      if (/^javas/.test(url) || !url) return
      const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
      if (useRouter) {
        if (typeof url === 'object' && url.replace === true) {
          $router.replace(url)
        } else {
          url === 'BACK' ? $router.go(-1) : $router.push(url)
        }
      } else {
        window.location.href = url
      }
    },
    hasTwoLoopItem () {
      if (this.list.length === 2 && this.loop) {
        this.listTwoLoopItem = this.list
      } else {
        this.listTwoLoopItem = []
      }
    },
    clickListItem (item) {
      this._go(item.url, this.$router)
      this.$emit('on-click-list-item', JSON.parse(JSON.stringify(item)))
    },
    buildBackgroundUrl (item) {
      return item.fallbackImg ? `url(${item.img}), url(${item.fallbackImg})` : `url(${item.img})`
    },
    render (index = 0) {
      this.swiper && this.swiper.destroy()
      this.swiper = new Swiper({
        container: this.$el,
        direction: this.direction,
        auto: this.auto,
        loop: this.loop,
        interval: this.interval,
        threshold: this.threshold,
        duration: this.duration,
        height: this.height || this._height,
        minMovingDistance: this.minMovingDistance,
        imgList: this.imgList
      })
        .on('swiped', (prev, index) => {
          this.current = index % this.length
          this.index = index % this.length
        })
      if (index > 0) {
        this.swiper.go(index)
      }
    },
    rerender () {
      if (!this.$el || this.hasRender) {
        return
      }
      this.hasRender = true
      this.hasTwoLoopItem()
      this.$nextTick(() => {
        this.index = this.value || 0
        this.current = this.value || 0
        this.length = this.list.length || this.$children.length
        this.destroy()
        this.render(this.value)
      })
    },
    destroy () {
      this.hasRender = false
      this.swiper && this.swiper.destroy()
    },
    getHeight () {
      if (this.height === 'auto') return 'auto'
      if (this.height === 'full') return '100%'
      const hasHeight = parseInt(this.height, 10)
      if (hasHeight) return this.height
      if (!hasHeight) {
        if (this.aspectRatio) {
          return this.$el.offsetWidth * this.aspectRatio + 'px'
        }
        return '180px'
      }
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    showDots: {
      type: Boolean,
      default: true
    },
    showDescMask: {
      type: Boolean,
      default: true
    },
    dotsPosition: {
      type: String,
      default: 'right'
    },
    dotsClass: String,
    auto: Boolean,
    loop: Boolean,
    interval: {
      type: Number,
      default: 3000
    },
    threshold: {
      type: Number,
      default: 50
    },
    duration: {
      type: Number,
      default: 300
    },
    height: {
      type: String,
      default: 'auto'
    },
    aspectRatio: Number,
    minMovingDistance: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      hasRender: false,
      current: this.index || 0,
      xheight: 'auto',
      length: this.list.length,
      index: 0,
      listTwoLoopItem: [] // issue #1484
    }
  },
  watch: {
    auto (val) {
      if (!val) {
        this.swiper && this.swiper.stop()
      } else {
        this.swiper && this.swiper._auto()
      }
    },
    list (val, oldVal) {
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        this.rerender()
      }
    },
    current (currentIndex) {
      this.index = currentIndex
      this.$emit('on-index-change', currentIndex)
    },
    index (val) {
      const _this = this
      if (val !== this.current) {
        this.$nextTick(() => {
          _this.swiper && _this.swiper.go(val)
        })
      }
      this.$emit('input', val)
    },
    value (val) {
      this.index = val
    }
  },
  beforeDestroy () {
    this.destroy()
  }
}

</script>

<style lang="stylus">
  .slider
    height 100%
    overflow hidden
    position relative

    > .indicator, .indicator-right
      position absolute
      right 15px
      bottom 10px

      > a
        float left
        margin-left 6px

        > .icon-dot
          display inline-block
          vertical-align middle
          width 6px
          height 6px
          border-radius 3px
          background-color #d0cdd1

        > .icon-dot.active
          background-color #04BE02

    > .indicator-center
      right 50%
      transform translateX(50%)

    > .indicator-left
      left 15px
      right auto

    > .swiper
      overflow hidden
      position relative

      > .swiper-item
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        overflow-y auto

        > a
          display block
          width 100%
          height 100%

          > .swiper-img
            display block
            width 100%
            height 100%
            background center center no-repeat
            background-size cover

          > .swiper-desc
            position absolute
            left 0
            right 0
            bottom 0
            /*height 1.4em*/
            font-size 16px
            padding 20px 50px 12px 13px
            margin 0
            background-image linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .7) 100%)
            color #fff
            text-shadow 0 1px 0 rgba(0, 0, 0, .5)
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            word-wrap normal
</style>
