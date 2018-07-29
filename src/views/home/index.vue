<template>
  <div class="home">
    <!-- @change="tabChange"全部 精华 分享 问答 招聘 客户端测试     :value.sync="active"-->
    <mu-tabs color="primary" :value.sync="active">
      <mu-tab v-for="tab of tabs" :key="tab.name">{{tab.title}}</mu-tab>
    </mu-tabs>
    <div class="mu-tabs-content" ref="container">
      <keep-alive>
        <swiper
          v-model="active"
          @on-index-change="(index) => this.active = index"
          :show-dots="false"
          height="full"
          :threshold="150"
        >
          <swiper-item v-for="tab of tabs" :key="tab.name">
            <tab-page :topics="tab.topics" :loading="loading" @loadMore="getTopics" @refresh="refresh"/>
          </swiper-item>
        </swiper>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  // import { mapActions } from 'vuex'
  import { Swiper, SwiperItem } from '@/components/swiper/'
  import TabPage from './components/tab-page'
  import { getTopics, getTopic } from '@/api/modules/topic'

  const tabs = [
    { title: '首页', path: '/home/all', name: 'all', topics: [], page: 1 },
    { title: '精华', path: '/home/good', name: 'good', topics: [], page: 1 },
    { title: '分享', path: '/home/share', name: 'share', topics: [], page: 1 },
    { title: '问答', path: '/home/ask', name: 'ask', topics: [], page: 1 },
    { title: '招聘', path: '/home/job', name: 'job', topics: [], page: 1 }
  ]

  export default {
    components: { Swiper, SwiperItem, TabPage },
    data () {
      return {
        tabs,
        active: 0,
        activeTab: tabs[0],
        loading: false
      }
    },
    watch: {
      active (index) {
        this.activeTab = this.tabs[index]
        if (!this.activeTab.topics.length) {
          this.getTopics()
        }
      }
    },
    methods: {
      async getTopics () {
        let { page, name: tab } = this.activeTab
        console.log(page, tab)
        this.loading = true
        let topics = await getTopics({ tab, page })
        this.activeTab.topics = [...this.activeTab.topics, ...topics]
        this.activeTab.page++
        this.loading = false
      },
      refresh () {
        this.activeTab.page = 1
        this.activeTab.topics = []
        this.getTopics()
      }
    },
    mounted () {
      this.getTopics()
    }
  }
</script>

<style scoped lang="stylus">
  .home
    height 100%
    padding 0
    overflow hidden
    .mu-tabs-content
      background-color #f5f5f5
      height calc(100% - 48px)
      overflow-y auto
      .mu-text
        font-size 16px
</style>
