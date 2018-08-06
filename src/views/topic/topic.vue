<template>
  <div class="create-topic">
    <mu-appbar color="primary" title="新建主题">
      <mu-button icon slot="left" @click="$router.back()">
        <mu-icon value="chevron_left"></mu-icon>
      </mu-button>
      <mu-button flat slot="right" @click="submit">发布</mu-button>
    </mu-appbar>
    <mu-container>
      <mu-form :model="topic" ref="form">
        <mu-form-item prop="tab" label="版块" :rules="tabRules">
          <mu-select v-model="topic.tab">
            <mu-option v-for="tab in tabs" :key="tab.key" :label="tab.val" :value="tab.key"></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item prop="title" label="标题" :rules="titleRules">
          <mu-text-field v-model="topic.title" placeholder="标题字数10字以上."></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="content" label="内容" :rules="contentRules">
          <mu-text-field v-model="topic.content" multi-line :rows="10" full-width></mu-text-field>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
import { createTopic } from '@/api/modules/topic'

export default {
  name: 'create-topic',
  data () {
    return {
      //ask share job dev
      tabs: [{ key: 'share', val: '分享' }, { key: 'ask', val: '问答' }, { key: 'job', val: '招聘' }, { key: 'dev', val: '客户端测试' }],
      topic: {
        title: '这是一个测试主题啊啊啊啊啊',
        tab: 'dev',
        content: '这是一个测试主题啊啊啊啊啊这是一个测试主题啊啊啊啊啊这是一个测试主题啊啊啊啊啊这是一个测试主题啊啊啊啊啊这是一个测试主题啊啊啊啊啊'
      },
      titleRules: [
        { validate: (val) => !!val, message: '必须填写标题' },
        { validate: (val) => val.length >= 10, message: '标题字数10字以上.' }
      ],
      tabRules: [
        { validate: (val) => !!val, message: '必须选择板块' }
      ],
      contentRules: [
        { validate: (val) => !!val, message: '必须填写内容' },
        { validate: (val) => val.length >= 10, message: '内容字数10字以上.' }
      ]
    }
  },
  methods: {
    async submit () {
      let result = await this.$refs.form.validate()
      if (result) {
        console.log(this.topic)
        let { success, topic_id: topicId } = await createTopic(this.topic)
        if (success) {
          this.$toast.success('发布成功')
          this.$router.push({ path: `/topic/${topicId}` })
        }
      }
    },
  }
}
</script>

<style scoped>

</style>