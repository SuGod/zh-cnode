<template>
  <mu-paper :z-depth="1" style="display: flex;flex-direction: column;height: 100%;">
    <mu-appbar color="primary" :title="`${isCurrent ? '我' : $route.params.loginname}的收藏`" style="width: 100%;">
      <mu-button icon slot="left" @click="$router.back()">
        <mu-icon value="chevron_left"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div class="tabs-content" style="flex: 1;overflow-y: auto;">
      <mu-list textline="two-line">
        <template v-for="topic of topics">
          <mu-list-item avatar button :key="topic.id" :to="`/topic/${topic.id}`">
            <mu-list-item-action>
              <mu-avatar><img :src="topic.author.avatar_url"></mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{topic.title}}</mu-list-item-title>
              <mu-list-item-sub-title class="topic-footer">
                <span><mu-icon value="comment"></mu-icon> {{topic.reply_count}}</span>
                <span><mu-icon value="visibility"></mu-icon> {{topic.visit_count}}</span>
                <span><mu-icon value="access_time"></mu-icon> {{topic.create_at | dateFmt}}</span>
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-list-item-after-text>
                <mu-badge :content="topic.tab | typeFmt"/>
              </mu-list-item-after-text>
              <mu-icon value="chevron_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider/>
        </template>
      </mu-list>
    </div>
  </mu-paper>
</template>

<script>
import { getCollect } from '@/api/modules/user'
import { mapGetters } from 'vuex'

export default {
  name: 'user-collect',
  data () {
    return {
      topics: [],
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    isCurrent () {
      return this.$route.params.loginname === this.userInfo.loginname
    },
  },
  beforeRouteEnter (to, from, next) {
    let { loginname } = to.params
    if (loginname) {
      next(async vm => vm.topics = await getCollect(loginname))
    }
  }
}
</script>

<style scoped lang="stylus">
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
</style>