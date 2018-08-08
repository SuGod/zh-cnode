<template>
  <mu-load-more
    @refresh="$emit('refresh')"
    :refreshing="refreshing"
    :loading="loading"
    @load="$emit('loadMore')"
    ref="container"
  >
    <template v-for="topic in topics">
      <mu-ripple class="topic-box" @click.native="$router.push({ path: `/topic/${topic.id}` })" :key="topic.id">
        <mu-flex class="topic-header" justify-content="between">
          <mu-flex class="topic-author">
            <mu-avatar class="author-avatar" :size="18"><img :src="topic.author.avatar_url"></mu-avatar>
            <span class="author-name">{{topic.author.loginname}}</span>
          </mu-flex>
          <mu-flex class="topic-type">
            <mu-badge v-if="topic.top" content="置顶" color="primary"/>
            <mu-badge v-if="topic.good" content="精华" color="success"/>
            <mu-badge :content="topic.tab | typeFmt"/>
          </mu-flex>
        </mu-flex>
        <div class="topic-body">
          <div class="topic-title">{{topic.title}}</div>
          <div class="topic-content">{{topic.content | getIntro(50)}}</div>
        </div>
        <div class="topic-footer">
          <span><mu-icon value="comment"></mu-icon> {{topic.reply_count}}</span>
          <span><mu-icon value="visibility"></mu-icon> {{topic.visit_count}}</span>
          <span><mu-icon value="access_time"></mu-icon> {{topic.create_at | dateFmt}}</span>
        </div>
      </mu-ripple>
    </template>
  </mu-load-more>
</template>

<script>
const types = { share: '分享', ask: '问答', job: '招聘', good: '精华', top: '置顶' }
export default {
  props: {
    topics: {
      type: Array,
      require: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      refreshing: false
    }
  },
}
</script>

<style scoped lang="stylus">
  .topic-box
    background-color white
    margin 10px 0
    position relative
    padding 10px
    .topic-header
      .topic-type > .mu-badge-container
        margin-right .2rem
      .author-avatar
        margin-right 8px
    .topic-body
      .topic-title
        font-weight bold
        margin .5rem 0

    .topic-footer
      display flex
      margin-top .3rem
      & > span
        display flex
        align-items center
        font-size .8rem
        margin-right 1em
        & > i.mu-icon
          font-size 1rem
          margin-right .3em
          color: #ccc

  /*.topic-author-info
    align-items center
    .mu-avatar
      margin 0*/

  /*.topic-info-bar > span
    display inline-block
    line-height 16px
    padding 0 .5rem
    i.mu-icon
      font-size 16px
      color: #ccc
      position relative
      top 0.2rem
  &:after
    border-right 1px solid grey*/

</style>
