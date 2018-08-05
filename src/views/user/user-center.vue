<template>
  <mu-paper :z-depth="1" class="user-center">
    <mu-appbar color="primary">我</mu-appbar>
    <mu-list textline="two-line">
      <mu-list-item v-if="accesstoken">
        <mu-ripple class="mu-list-item-ripple">
          <mu-list-item-action>
            <mu-avatar>
              <img :src="userInfo.avatar_url">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{userInfo.loginname}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="chevron_right"></mu-icon>
          </mu-list-item-action>
        </mu-ripple>
      </mu-list-item>
      <mu-list-item v-else @click.native="prompt">
        <mu-ripple class="mu-list-item-ripple">
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/images/avatar.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>请登录...</mu-list-item-title>
            <!--<mu-list-item-sub-title>总是中断</mu-list-item-sub-title>-->
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="chevron_right"></mu-icon>
          </mu-list-item-action>
        </mu-ripple>
      </mu-list-item>
    </mu-list>
    <template v-if="accesstoken">
      <mu-divider></mu-divider>
      <mu-list>
        <mu-list-item button :ripple="false">
          <mu-ripple class="mu-list-item-ripple">
            <mu-list-item-action>
              <mu-icon value="work"/>
            </mu-list-item-action>
            <mu-list-item-title>我的积分</mu-list-item-title>
            <mu-list-item-action>
              <mu-badge :content="userDetailCount.score"/>
            </mu-list-item-action>
          </mu-ripple>
        </mu-list-item>
        <!--<mu-list-item button :ripple="false">
          <mu-ripple class="mu-list-item-ripple">
            <mu-list-item-action>
              <mu-icon value="notifications"/>
            </mu-list-item-action>
            <mu-list-item-title>消息中心</mu-list-item-title>
            <mu-list-item-action>
              <mu-badge :content="userDetailCount.messageCount" color="secondary"/>
            </mu-list-item-action>
          </mu-ripple>
        </mu-list-item>-->
        <mu-list-item button :ripple="false">
          <mu-ripple class="mu-list-item-ripple">
            <mu-list-item-action>
              <mu-icon value="assignment"/>
            </mu-list-item-action>
            <mu-list-item-title>我的话题</mu-list-item-title>
            <mu-list-item-action>
              <mu-badge :content="userDetailCount.topicsCount"/>
            </mu-list-item-action>
          </mu-ripple>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-ripple class="mu-list-item-ripple">
            <mu-list-item-action>
              <mu-icon value="comment"/>
            </mu-list-item-action>
            <mu-list-item-title>我参与的</mu-list-item-title>
            <mu-list-item-action>
              <mu-badge :content="userDetailCount.replysCount"/>
            </mu-list-item-action>
          </mu-ripple>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-ripple class="mu-list-item-ripple">
            <mu-list-item-action>
              <mu-icon value="stars"/>
            </mu-list-item-action>
            <mu-list-item-title>我的收藏</mu-list-item-title>
            <mu-list-item-action>
              <mu-badge :content="userDetailCount.collectCount"/>
            </mu-list-item-action>
          </mu-ripple>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item button :ripple="false" @click="switchTheme(!darkTheme)">
          <mu-ripple class="mu-list-item-ripple">
            <mu-list-item-action>
              <mu-icon value="brightness_4"/>
            </mu-list-item-action>
            <mu-list-item-title>夜间模式</mu-list-item-title>
            <mu-list-item-action>
              <mu-switch v-model="darkTheme" readonly></mu-switch>
            </mu-list-item-action>
          </mu-ripple>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-ripple class="mu-list-item-ripple">
            <mu-list-item-action>
              <mu-icon value="settings"/>
            </mu-list-item-action>
            <mu-list-item-title>设置</mu-list-item-title>
          </mu-ripple>
        </mu-list-item>
      </mu-list>
    </template>
  </mu-paper>
</template>

<script>
import { getUserDateilCount } from '@/api/modules/user'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      userDetailCount: {}
    }
  },
  computed: {
    ...mapGetters(['darkTheme', 'accesstoken', 'userInfo'])
  },
  methods: {
    ...mapActions(['switchTheme']),
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
  },
  async mounted () {
    if (this.userInfo.loginname) {
      this.userDetailCount = await getUserDateilCount(this.userInfo.loginname)
    }
  }
}
</script>

<style scoped>

</style>