<template>
  <div class="home">
    <mu-tabs color="primary" :value.sync="active">
      <mu-tab v-for="tab of tabs" :key="tab.name">{{tab.title}}</mu-tab>
    </mu-tabs>
    <div class="mu-tabs-content" ref="container">
      <keep-alive>
        <swiper
          ref="slider"
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
      <mu-button fab small color="primary" class="new-topic" to="/createTopic" v-if="accesstoken">
        <mu-icon value="add"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperItem } from '@/components/swiper/'
import TabPage from './components/tab-page'
import { getTopics } from '@/api/modules/topic'

const tabs = [
  { title: '首页', path: '/home/all', name: 'all', topics: [], page: 1, scrollTop: 0 },
  { title: '精华', path: '/home/good', name: 'good', topics: [], page: 1, scrollTop: 0 },
  { title: '分享', path: '/home/share', name: 'share', topics: [], page: 1, scrollTop: 0 },
  { title: '问答', path: '/home/ask', name: 'ask', topics: [], page: 1, scrollTop: 0 },
  // { title: '招聘', path: '/home/job', name: 'job', topics: [], page: 1, scrollTop: 0 },
  { title: '测试', path: '/home/dev', name: 'dev', topics: [], page: 1, scrollTop: 0 }
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
  computed: {
    ...mapGetters(['accesstoken'])
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
  },
  /**
   * 保持组件滚动条位置.
   * @param to
   * @param from
   * @param next
   */
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      let scrollElement = Array.from(vm.$refs.slider.$el.querySelector('.swiper').children)[vm.active]
      scrollElement.scrollTo(0, vm.activeTab.scrollTop)
    })
  },
  beforeRouteLeave (to, from, next) {
    let scrollElement = Array.from(this.$refs.slider.$el.querySelector('.swiper').children)[this.active]
    this.activeTab.scrollTop = scrollElement.scrollTop
    next()
  }
}
</script>

<style scoped lang="stylus">
  .home
    height 100%
    padding 0
    overflow hidden
    .mu-tabs-content
      position relative
      background-color #f5f5f5
      height calc(100% - 48px)
      /*overflow-y auto*/
      .new-topic
        position fixed
        right 1rem
        bottom 4.5rem
      .mu-text
        font-size 16px
</style>
