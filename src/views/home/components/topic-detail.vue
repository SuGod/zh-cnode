<template>
  <div class="topic-card">
    <mu-appbar :class="['header-bar',{hide:headerHide}]">
      <mu-button icon slot="left" @click="$router.back()">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <div style="display: flex;align-items: center;">
        <mu-avatar><img :src="topic.author.avatar_url"></mu-avatar>
        <span style="font-size: 1rem;color: #999;">{{topic.author.loginname}}</span>
      </div>
      <mu-button icon slot="right">
        <mu-icon value="more_vert"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-card class="topic-card-content" ref="contentCard">
      <mu-card-title class="topic-title" :title="topic.title" :sub-title="topic.create_at | dateFmt"/>
      <mu-container class="topic-content" v-html="topic.content" v-highlight/>
      <mu-ripple class="topic-reply-btn">
        <mu-avatar><img :src="topic.author.avatar_url"></mu-avatar>
        <span style="font-size: 1rem;color: #999;margin-left: .5rem">说点什么吧...</span>
      </mu-ripple>
      <mu-container class="topic-reply">
        <topic-reply :replies="topic.replies" @onPraise="praiseReply"/>
      </mu-container>
    </mu-card>
    <br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { replyPraise } from '@/api/modules/reply'
import { getTopic } from '@/api/modules/topic'
import TopicReply from './topic-reply'

export default {
  name: 'topicDetail',
  components: { TopicReply },
  computed: {
    ...mapGetters(['accesstoken']),
    scrollElement () {
      return this.$refs.contentCard.$el
    }
  },
  data () {
    return {
      headerHide: false,
      topicId: null,
      topic: { author: {}, replies: [] },
      saveScrollTop: 0
    }
  },
  methods: {
    async praiseReply (replyId) {
      if (!this.accesstoken) {
        this.$alert('请先登录，登陆后即可点赞。')
      } else {
        let { success, action } = await replyPraise(replyId, this.accesstoken)
        if (success) {
          let reply = this.topic.replies.find(item => item.id === replyId)
          reply.is_uped = action === 'up'
          let index = reply.ups.findIndex(this.accesstoken)
          index === -1 ? reply.ups.push(this.accesstoken) : reply.ups.splice(index, 1)
        }
      }
    },
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
  .topic-card
    height 100%
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

    .topic-card-content
      /*margin-top 56px*/
      height 100%
      padding-top 56px
      overflow-y auto
      overflow-x hidden
      background-color #f5f5f5
      & >>> .container
        background-color white
        padding 0
        margin-bottom 10px
      & >>> .container:last-child
        margin-bottom 0
      .topic-title
        background-color white
        padding-bottom 0
      .topic-content >>> img
        max-width 100%
      .topic-reply-btn
        display flex
        align-items center
        position relative
        padding: 0 10px
        background: white
        line-height: 4rem
        margin-bottom 10px
</style>
