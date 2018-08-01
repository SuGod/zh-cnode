<template>
  <div id="app">
    <div class="main-body">
      <router-view/>
    </div>
    <mu-bottom-nav class="bottom-nav" :value.sync="shift" shift color="primary">
      <mu-bottom-nav-item to="home" value="home" title="Home" icon="account_balance"></mu-bottom-nav-item>
      <mu-bottom-nav-item to="search" value="search" title="Search" icon="search"></mu-bottom-nav-item>
      <mu-bottom-nav-item to="user" value="user" title="User" icon="person"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shift: this.$route.name
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
