<template>
  <div class="topic-card">
    <mu-appbar :class="['header-bar',{hide:headerHide}]">
      <mu-button icon slot="left" to="/">
        <mu-icon value="arrow_back"/>
      </mu-button>
      <div style="display: flex;align-items: center;">
        <mu-avatar><img :src="topic.author.avatar_url"></mu-avatar>
        <router-link style="font-size: 1rem;color: #999;" :to="`/user/${topic.author.loginname}`">{{topic.author.loginname}}</router-link>
      </div>
      <mu-button icon slot="right" @click="collect" v-if="accesstoken">
        <mu-icon :value="topic.is_collect ?'star':'star_border'"/>
      </mu-button>
    </mu-appbar>
    <mu-card class="topic-card-content" ref="contentCard">
      <mu-card-title class="topic-title" :title="topic.title" :sub-title="topic.create_at | dateFmt"/>
      <mu-container class="topic-content" v-html="topic.content" v-highlight/>
      <div class="topic-reply-btn">
        <!--<mu-avatar><img :src="topic.author.avatar_url"></mu-avatar>-->
        <!--<span style="font-size: 1rem;color: #999;margin-left: .5rem">说点什么吧...</span>-->
        <mu-text-field class="reply-input" v-model="reply" multi-line :rows="1" :rows-max="3" placeholder="说点什么吧..."/>
        <mu-button fab small color="primary" @click="submitReply">
          <mu-icon value="send"></mu-icon>
        </mu-button>
      </div>
      <mu-container class="topic-reply">
        <topic-reply :replies="topic.replies" @onPraise="praiseReply"/>
      </mu-container>
    </mu-card>
    <br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { replyPraise, createReply } from '@/api/modules/reply'
import { getTopic, collectTopic, cancelCollectTopic } from '@/api/modules/topic'
import TopicReply from './topic-reply'

export default {
  name: 'topicDetail',
  components: { TopicReply },
  computed: {
    ...mapGetters(['accesstoken', 'userInfo']),
    scrollElement () {
      return this.$refs.contentCard.$el
    }
  },
  data () {
    return {
      headerHide: false,
      topicId: null,
      topic: { author: {}, replies: [] },
      saveScrollTop: 0,
      reply: ''
    }
  },
  methods: {
    //收藏主题
    async collect () {
      let result = {}
      if (this.topic.is_collect) {
        result = await cancelCollectTopic(this.topic.id)
      } else {
        result = await collectTopic(this.topic.id)
      }

      if (result.success) {
        this.$toast.success('操作成功!')
        this.topic.is_collect = !this.topic.is_collect
      } else {
        this.$toast.error('操作失败!')
      }
    },
    async praiseReply (replyId) {
      if (this.checkAuth('请先登录，登陆后即可点赞。')) {
        let { success, action } = await replyPraise(replyId, this.accesstoken)
        if (success) {
          let reply = this.topic.replies.find(item => item.id === replyId)
          reply.is_uped = action === 'up'
          let index = reply.ups.indexOf(this.userInfo.id)
          index === -1 ? reply.ups.push(this.userInfo.id) : reply.ups.splice(index, 1)
        }
      }
    },
    async getTopicDetail (id) {
      const loading = this.$loading()
      this.topic = await getTopic(id)
      loading.close()
    },
    async submitReply () {
      if (this.checkAuth('请先登录，登陆后即可评论。')) {
        if (!this.reply.length || this.reply === null) {
          this.$alert('请输入评论内容')
          return false
        }
        if (this.reply.length < 3) {
          this.$alert('至少说 3 个字吧..')
          return false
        }
        // this.$alert(this.reply)
        let topicId = this.$route.params.id
        let { success, reply_id: replyId } = await createReply(topicId, this.reply, this.accesstoken)

        if (success) {
          let { replies } = this.topic
          replies.push({
            id: replyId,
            author: this.userInfo,
            content: `<div class="markdown-text"><p>${this.reply}</p></div>`,
            ups: [],
            create_at: new Date(),
            reply_id: null,
            is_uped: false
          })
          this.reply = ''
          this.$toast.success('回复成功.')
        }
      }
    },
    setScrollTop () {
      let currentScrollTop = this.scrollElement.scrollTop
      this.headerHide = currentScrollTop > this.saveScrollTop
      this.saveScrollTop = currentScrollTop
    },
    checkAuth (errorMsg = '该操作需要登录,请先登录.') {
      if (!this.accesstoken) {
        this.$alert(errorMsg)
        return false
      }
      return true
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
        .reply-input
          margin 0 .8rem
          width 100%
          padding .8rem 0
</style>
