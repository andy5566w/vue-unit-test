<template>
  <div class="columns">
    <div class="column">
      <div class="label">New Post</div>
      <input type="text" class="input" v-model="title" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div ref="contenteditable" contenteditable @input="handleInput"></div>
    </div>
    <div class="column" v-html="html"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { Post } from '@/mocks'
import { parse } from 'marked'
import highlight from 'highlight.js'
import debounce from 'lodash/debounce'
// eslint-disable-next-line @typescript-eslint/ban-types
// const debounce = (fn: Function, second: number) => {
//   let timer: any = null
//   const fb = function (arg: string) {
//     // eslint-disable-next-line @typescript-eslint/no-this-alias
//     // const context: typeof fb = this
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.call(this, arg)
//     }, second)
//   }
//   return fb
// }
export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const title = ref<string>(props.post.title)
    const content = ref<string>('## Title\nEnter your content...')
    const contenteditable = ref<null | HTMLElement>(null)
    const html = ref('')

    const parseHtml = (str: string) => {
      html.value = parse(str, {
        gfm: true,
        breaks: true,
        highlight: (code: string) => highlight.highlightAuto(code).value,
      })
    }
    watch(
      content,
      debounce((newContent: string) => {
        parseHtml(newContent)
      }, 500),
      { immediate: true }
    )
    onMounted(() => {
      if (!contenteditable.value) {
        throw Error('Error occur')
      }
      contenteditable.value.innerText = content.value
    })
    const handleInput = () => {
      if (!contenteditable.value) {
        throw Error('Error occur')
      }
      content.value = contenteditable.value.innerText || ''
    }
    return { title, contenteditable, content, handleInput, html }
  },
})
</script>

<style scoped></style>
