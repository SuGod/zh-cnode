<template>
  <mu-paper :z-depth="1" style="display: flex;flex-direction: column;height: 100%;">
    <mu-appbar color="primary" title="我的消息" style="width: 100%;">
      <mu-button icon slot="left" @click="$router.back()">
        <mu-icon value="chevron_left"></mu-icon>
      </mu-button>
    </mu-appbar>
    <template v-if="accesstoken">
      <mu-list textline="two-line">
        <mu-sub-header>未读消息 <mu-badge color="secondary" :content="`${messages.hasnot_read_messages.length}`"/></mu-sub-header>
        <template v-if="messages.hasnot_read_messages.length" v-for="notReadMsg of messages.hasnot_read_messages">
          <mu-list-item button :key="notReadMsg.id">
            <mu-list-item-content>
              <mu-list-item-title>{{notReadMsg.topic.title}}</mu-list-item-title>
              <mu-list-item-sub-title>{{notReadMsg.reply.create_at | dateFmt}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </template>
        <template v-else>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>暂无数据...</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </template>
      </mu-list>
      <mu-list textline="two-line">
        <mu-sub-header>已读消息  <mu-badge color="secondary" :content="`${messages.has_read_messages.length}`"/></mu-sub-header>
        <template v-if="messages.has_read_messages.length" v-for="hasReadMsg of messages.has_read_messages">
          <mu-list-item button :key="hasReadMsg.id">
            <mu-list-item-content>
              <mu-list-item-title>{{hasReadMsg.topic.title}}</mu-list-item-title>
              <mu-list-item-sub-title>{{hasReadMsg.reply.create_at | dateFmt}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </template>
        <span v-else>暂无数据...</span>
      </mu-list>
      <mu-dialog transition="slide-bottom" fullscreen :open.sync="openMessage">
        <mu-appbar color="primary" title="关于">
          <mu-button icon color="primary" slot="right" flat @click="openMessage = false">
            <mu-icon value="close"></mu-icon>
          </mu-button>
        </mu-appbar>
        <mu-container>

        </mu-container>
      </mu-dialog>
    </template>
    <template v-else>
      <span>请先登录...</span>
    </template>
  </mu-paper>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMessages } from '@/api/modules/message'

export default {
  name: 'message',
  data () {
    return {
      openMessage: false,
      message: {},
      messages: {
        has_read_messages: [],
        hasnot_read_messages: []
      }
    }
  },
  computed: {
    ...mapGetters(['accesstoken'])
  },
  async mounted () {
    if (this.accesstoken) {
      this.messages = await getMessages()
    } else {
      this.$alert('请先登录.').then(() => {
        this.$router.push('/user')
      })
    }
  }
}
</script>

<style scoped>

</style>