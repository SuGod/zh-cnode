<template>
  <swiper v-model="index" @on-index-change="(index) => this.index = index" :show-dots="false" height="full">
    <swiper-item>第一页</swiper-item>
    <swiper-item>第二页</swiper-item>
    <swiper-item>第三页</swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from '@/components/swiper/'

  export default {
    components: { Swiper, SwiperItem },
    data () {
      return {
        index: 0
      }
    },
  }
</script>