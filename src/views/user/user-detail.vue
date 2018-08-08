<template>
  <mu-paper :z-depth="1" style="display: flex;flex-direction: column;height: 100%;">
    <mu-appbar color="primary" title="用户信息" style="width: 100%;">
      <mu-button icon slot="left" @click="$router.back()">
        <mu-icon value="chevron_left"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-list textline="two-line">
      <mu-list-item avatar button>
        <mu-list-item-action>
          <mu-avatar><img :src="user.avatar_url"></mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{user.loginname}}</mu-list-item-title>
          <mu-list-item-sub-title>GitHub: {{user.githubUsername}} | 注册时间 {{user.create_at | dateFmt}}</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <span>积分:{{user.score}}</span>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <mu-divider/>
    <mu-list>
      <mu-list-item button :to="`/user/collect/${user.loginname}`">
        <mu-list-item-action>
          <mu-icon value="star"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>他的收藏</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="chevron_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <mu-divider/>
    <mu-tabs :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" full-width>
      <mu-tab>最近创建的话题</mu-tab>
      <mu-tab>最近参与的话题</mu-tab>
    </mu-tabs>
    <div class="tabs-content" style="flex: 1;overflow-y: auto;">
      <mu-list textline="two-line" v-show="active === 0">
        <template v-for="recentTopic of user.recent_topics">
          <mu-list-item avatar button :key="`${recentTopic.id}recentTopic`" :to="`/topic/${recentTopic.id}`">
            <mu-list-item-action>
              <mu-avatar><img :src="recentTopic.author.avatar_url"></mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{recentTopic.title}}</mu-list-item-title>
              <mu-list-item-sub-title>{{recentTopic.last_reply_at | dateFmt}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider/>
        </template>
      </mu-list>
      <mu-list textline="two-line" v-show="active === 1">
        <template v-for="replyTopic of user.recent_replies">
          <mu-list-item avatar button :key="`${replyTopic.id}replyTopic`" :to="`/topic/${replyTopic.id}`">
            <mu-list-item-action>
              <mu-avatar><img :src="replyTopic.author.avatar_url"></mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{replyTopic.title}}</mu-list-item-title>
              <mu-list-item-sub-title>{{replyTopic.last_reply_at | dateFmt}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider/>
        </template>
      </mu-list>
    </div>
  </mu-paper>
</template>

<script>
import { getUserInfo } from '@/api/modules/user'

export default {
  name: 'user-detail',
  data () {
    return {
      active: 0,
      user: {
        loginname: null,
        avatar_url: null,
        githubUsername: null,
        create_at: null,
        score: 0,
        recent_topics: [],
        recent_replies: []
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    let { loginname } = to.params
    if (loginname) {
      getUserInfo(loginname).then((result) => {
        next(vm => {
          vm.user = result
        })
      })
    }
  }
}
</script>
