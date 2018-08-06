<template>
  <mu-paper :z-depth="1" class="user-center">
    <mu-appbar color="primary">我</mu-appbar>
    <mu-list textline="two-line">
      <mu-list-item v-if="accesstoken">
        <mu-list-item-action>
          <mu-avatar>
            <img :src="userInfo.avatar_url">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{userInfo.loginname}}</mu-list-item-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-icon value="chevron_right"/>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item v-else @click.native="prompt">
        <mu-list-item-action>
          <mu-avatar>
            <mu-icon value="person"/>
            <!--<img src="@/assets/images/avatar.jpg">-->
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>请登录...</mu-list-item-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-icon value="chevron_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <mu-divider/>
    <template v-if="accesstoken">
      <mu-list>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="work"/>
          </mu-list-item-action>
          <mu-list-item-title>我的积分</mu-list-item-title>
          <mu-list-item-action>
            <mu-badge :content="userDetailCount.score"/>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="assignment"/>
          </mu-list-item-action>
          <mu-list-item-title>我的话题</mu-list-item-title>
          <mu-list-item-action>
            <mu-badge :content="userDetailCount.topicsCount"/>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="comment"/>
          </mu-list-item-action>
          <mu-list-item-title>我参与的</mu-list-item-title>
          <mu-list-item-action>
            <mu-badge :content="userDetailCount.replysCount"/>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="stars"/>
          </mu-list-item-action>
          <mu-list-item-title>我的收藏</mu-list-item-title>
          <mu-list-item-action>
            <mu-badge :content="userDetailCount.collectCount"/>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item button @click="switchTheme(!darkTheme)">
          <mu-list-item-action>
            <mu-icon value="brightness_4"/>
          </mu-list-item-action>
          <mu-list-item-title>夜间模式</mu-list-item-title>
          <mu-list-item-action>
            <mu-switch v-model="darkTheme" readonly></mu-switch>
          </mu-list-item-action>
        </mu-list-item>
        <!--<mu-list-item button to="/settings">
          <mu-list-item-action>
            <mu-icon value="settings"/>
          </mu-list-item-action>
          <mu-list-item-title>设置</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chevron_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>-->
      </mu-list>
    </template>
    <mu-divider/>
    <mu-list>
      <mu-list-item button @click="openAbout = true">
        <mu-list-item-action>
          <mu-icon value="info"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>关于</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="chevron_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <template v-if="accesstoken">
        <mu-list-item button @click="confirm">
          <mu-list-item-title>退出登录</mu-list-item-title>
        </mu-list-item>
      </template>
    </mu-list>
    <mu-dialog transition="slide-bottom" fullscreen :open.sync="openAbout">
      <mu-appbar color="primary" title="关于">
        <mu-button icon color="primary" slot="right" flat @click="openAbout = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-container>
        <p>CNode 社区为国内最大最具影响力的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
        <p>CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。</p>
        <p>CNode 的 SLA 保证是，一个9，即 90.000000%。</p>
        <p>社区目前由 @alsotang 在维护，有问题请联系：https://github.com/alsotang</p>
        <mu-divider/>
        <p>基于 Vue 全家桶 的 CNode 移动端.</p>
      </mu-container>
    </mu-dialog>
  </mu-paper>
</template>

<script>
import { getUserDetailCount } from '@/api/modules/user'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      userDetailCount: {},
      openAbout: false
    }
  },
  computed: {
    ...mapGetters(['darkTheme', 'accesstoken', 'userInfo'])
  },
  watch: {
    accesstoken (n) {
      if (n) this.getUserDetailCount(this.userInfo.loginname)
    }
  },
  methods: {
    ...mapActions(['switchTheme', 'logout']),
    confirm () {
      this.$confirm('确定要注销吗？', '提示', { type: 'warning' }).then(({ result }) => {
        if (result) {
          this.logout()
        }
      })
    },
    prompt () {
      this.$prompt('请输入Access Token', '提示', {
        inputValue: 'cf3ff496-8d46-4238-8251-24e3eeef3eda',
        validator (value) {
          return {
            valid: /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/.test(value),
            message: '请输入正确的Access Token'
          }
        }
      }).then(({ result, value }) => {
        if (result) {
          this.$store.dispatch('checkToken', value)
        }
      })
    },
    async getUserDetailCount (loginname) {
      this.userDetailCount = await getUserDetailCount(loginname)
    }
  },
  async mounted () {
    if (this.accesstoken) {
      this.getUserDetailCount(this.userInfo.loginname)
    }
  }
}
</script>
