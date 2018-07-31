<template>
  <transition>
    <keep-alive exclude="topicDetail">
      <router-view/>
    </keep-alive>
  </transition>
</template>

<style lang="stylus">
  size()
    width 100%
    height 100%

  html, body
    size()
    overflow-x hidden

  /*overflow hidden*/

  #app
    size()
</style>
