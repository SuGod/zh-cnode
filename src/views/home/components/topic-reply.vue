<template>
  <div class="reply-list">
    <template v-if="replies.length">
      <div class="reply-list-header">{{replies.length}} 条评论</div>
      <mu-divider/>
      <template v-for="reply of replies">
        <div class="reply-list-item">
          <div class="reply-item-action">
            <mu-avatar><img :src="reply.author.avatar_url"></mu-avatar>
          </div>
          <div class="reply-item-content">
            <div class="reply-title">{{reply.author.loginname}}</div>
            <div class="reply-content" v-html="reply.content" v-highlight></div>
            <div class="reply-info">
            <span @click="$emit('onPraise',reply.id)">
              <mu-icon :value="reply.is_uped | toIconName"/>
              <span>{{reply.ups.length}}</span>
            </span>
              <span><mu-icon value="access_time"/> <span>{{reply.create_at | dateFmt}}</span></span>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="no-reply">
        <mu-icon value="comment" size="40"/>
        <span>暂无评论</span>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    replies: {
      type: Array,
      required: true
    }
  },
  filters: {
    toIconName (val) {
      return val ? 'favorite' : 'favorite_border'
    }
  }
}
</script>

<style scoped lang="stylus">
  .reply-list
    padding 0 10px
    .no-reply
      display flex
      flex-direction column
      align-items center
      padding 1.5rem 0
      color #bdbdbd
    .reply-list-header
      font-weight bold
      line-height 3
      padding-left .5rem
      font-size 1rem
    .reply-list-item
      display flex
      align-items flex-start
      color rgba(0, 0, 0, .87)
      padding 10px 0 3px
      border-bottom 1px solid #f5f5f5
      &:last-child
        border-bottom none
      .reply-item-action
        min-width 56px
        height 100%
        color rgba(0, 0, 0, .54)
        display flex
        align-items center
      .reply-item-content
        flex: 1 1 auto
        text-align left
        min-width 1px
        .reply-title
          font-weight bold
        .reply-content
          font-size .8rem
          margin-bottom 5px
        /*& >>> p
          margin 0
        & >>> img
          max-width 100%*/
        .reply-info
          display flex
          & > span
            display flex
            align-items center
            font-size .8rem
            margin-right 1em
            /*color: #bdbdbd*/
            & > i.mu-icon
              font-size 1rem
              margin-right .3em
              color: #bdbdbd
</style>