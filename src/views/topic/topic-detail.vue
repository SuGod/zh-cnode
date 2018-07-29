<template>
  <div>
    <mu-appbar>
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
    <mu-card>
      <mu-card-title :title="topic.title" :sub-title="topic.create_at | dateFmt"/>
      <mu-container class="topic-content" v-html="topic.content" v-highlight/>
    </mu-card>
  </div>
</template>

<script>
  import { getTopic } from '@/api/modules/topic'

  export default {
    name: 'topicDetail',
    data () {
      return {
        topicId: null,
        topic: { author: {} }
      }
    },
    methods: {
      async getTopicDetail (id) {
        const loading = this.$loading()
        this.topic = await getTopic(id)
        loading.close()
      }
    },
    created () {
      let { id: topicId } = this.$route.params
      console.log(topicId, 'id')
      this.getTopicDetail(topicId)
    }
  }
</script>

<style scoped lang="stylus">
  .mu-appbar-title
    display flex
    align-items center
    .mu-avatar
      margin-right .5rem

  .mu-card-title
    font-size 1.2rem
    font-weight bold

  .topic-content >>> img
    max-width 100%


</style>