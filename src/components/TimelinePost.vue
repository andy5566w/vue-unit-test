<template>
  <a class="panel-block">
    <a href="">{{ post.title }}</a>
    <span>{{ post.created.format('Do MMMM') }}</span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Post } from '../mocks'

export default defineComponent({
  name: 'TimelinePost',
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
})
</script>

<style scoped></style>
