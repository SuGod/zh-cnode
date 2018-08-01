<template>
  <mu-paper :z-depth="1" class="user-center">
    <mu-appbar color="primary">Setting</mu-appbar>
    <mu-list textline="two-line">
      <mu-list-item>
        <mu-ripple class="mu-list-item-ripple">
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/images/avatar.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>通知与信息设置</mu-list-item-title>
            <mu-list-item-sub-title>总是中断</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="chevron_right"></mu-icon>
          </mu-list-item-action>
        </mu-ripple>
      </mu-list-item>
    </mu-list>
    <mu-divider></mu-divider>
    <mu-list>
      <mu-list-item button :ripple="false">
        <mu-ripple class="mu-list-item-ripple">
          <mu-list-item-action>
            <mu-icon value="grade"/>
          </mu-list-item-action>
          <mu-list-item-title>All mail</mu-list-item-title>
          <mu-list-item-action>
            <mu-list-item-after-text>123</mu-list-item-after-text>
          </mu-list-item-action>
        </mu-ripple>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-ripple class="mu-list-item-ripple">
          <mu-list-item-action>
            <mu-icon value="grade"/>
          </mu-list-item-action>
          <mu-list-item-title>All mail</mu-list-item-title>
          <mu-list-item-action>
            <mu-list-item-after-text>123</mu-list-item-after-text>
          </mu-list-item-action>
        </mu-ripple>
      </mu-list-item>
      <mu-list-item button :ripple="false" @click="switchTheme(!darkTheme)">
        <mu-list-item-title>夜间模式</mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="darkTheme" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </mu-paper>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['darkTheme'])
  },
  methods: {
    ...mapActions(['switchTheme'])
  }
}
</script>

<style scoped>

</style>