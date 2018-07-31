<template>
  <div style="height: 100%;">
    <mu-appbar :class="['header-bar',{hide:headerHide}]">
      <mu-button icon slot="left" @click="$router.back()">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <div style="display: flex;align-items: center;">
        <mu-avatar :size="30"><img :src="topic.author.avatar_url"></mu-avatar>
        <span style="font-size: 1rem;color: #999;">{{topic.author.loginname}}</span>
      </div>
      <mu-button icon slot="right">
        <mu-icon value="more_vert"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-card class="topic-content-card" ref="contentCard">
      <mu-card-title :title="topic.title" :sub-title="topic.create_at | dateFmt"/>
      <mu-container class="topic-content" v-html="topic.content" v-highlight/>
    </mu-card>
  </div>
</template>

<script>
import { getTopic } from '@/api/modules/topic'
// import { getTouchDirection } from '@/utils/'

export default {
  name: 'topicDetail',
  data () {
    return {
      headerHide: false,
      topicId: null,
      topic: { author: {} },
      saveScrollTop: 0
    }
  },
  methods: {
    async getTopicDetail (id) {
      const loading = this.$loading()
      this.topic = await getTopic(id)
      loading.close()
    },
    setScrollTop () {
      let currentScrollTop = this.scrollElement.scrollTop
      this.headerHide = currentScrollTop > this.saveScrollTop
      this.saveScrollTop = currentScrollTop
    },
    bindScrollEvent () {

      /* let startx, starty
      // 手指接触屏幕
      $el.addEventListener('touchstart', e => {
        startx = e.touches[0].pageX
        starty = e.touches[0].pageY
      }, false)
      // 手指离开屏幕
      $el.addEventListener('touchend', e => {
        let endx, endy
        endx = e.changedTouches[0].pageX
        endy = e.changedTouches[0].pageY
        let direction = getDirection(startx, starty, endx, endy)
        // 向上
        if (direction === 1) {
          if (!this.headerHide) this.headerHide = true
        }
        // 向下
        if (direction === 2) {
          if (this.headerHide) this.headerHide = false
        }
      }, false) */
    }
  },
  computed: {
    scrollElement () {
      return this.$refs.contentCard.$el
    }
  },
  created () {
    let { id: topicId } = this.$route.params
    this.getTopicDetail(topicId)
  },
  mounted () {
    this.scrollElement.addEventListener('scroll', this.setScrollTop, false)
    // this.bindScrollEvent()
  },
  destroyed () {
    this.scrollElement.removeEventListener('scroll', this.setScrollTop, false)
  }
}
</script>

<style scoped lang="stylus">
  .header-bar
    position fixed
    top 0
    right 0
    left 0
    transition top 1s
    &.hide
      top -56px

  .mu-appbar-title
    display flex
    align-items center
    .mu-avatar
      margin-right .5rem

  .mu-card-title
    font-size 1.2rem
    font-weight bold

  .topic-content-card
    /*margin-top 56px*/
    height 100%
    padding-top 56px
    overflow-y auto
    overflow-x hidden
    .topic-content >>> img
      max-width 100%
</style>
