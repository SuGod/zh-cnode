<template>
  <div id="app">
    <div class="main-body">
      <router-view/>
    </div>
    <mu-bottom-nav class="bottom-nav" :value.sync="shift" shift color="primary">
      <mu-bottom-nav-item to="home" value="home" title="Home" icon="account_balance"></mu-bottom-nav-item>
      <mu-bottom-nav-item to="about" value="about" title="About" icon="person"></mu-bottom-nav-item>
      <mu-bottom-nav-item to="test1" value="test1" title="Test1" icon="looks_one"></mu-bottom-nav-item>
      <mu-bottom-nav-item to="test2" value="test2" title="Test2" icon="looks_two"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shift: 'home',
      open: false
    }
  }
}
</script>

<style scoped lang="stylus">
  .main-body
    position absolute
    top 0
    right 0
    bottom 56px
    left 0

  .bottom-nav
    position absolute
    left 0
    right 0
    bottom 0
    a
      color: #fff
</style>
