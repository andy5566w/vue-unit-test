<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        @click="setPeriod(period)"
        :class="{ 'is-active': currentPeriod === period }"
        :data-test="period"
        >{{ period }}</a
      >
    </span>
    <TimelinePost
      v-for="post in posts"
      :key="post.id"
      :post="post"
      class="panel-block"
    />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import moment from 'moment'
import { Post } from '@/mocks'
import TimelinePost from './TimelinePost.vue'
const wait = (second: number) => new Promise((res) => setTimeout(res, second))
import { useStore } from '@/store'

type Period = 'Today' | 'This Week' | 'This Month'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: { TimelinePost },
  async setup() {
    await wait(2000)
    const periods: Period[] = ['Today', 'This Week', 'This Month']
    const currentPeriod = ref<Period>('Today')
    const store = useStore()
    await store.fetchPosts()

    const allPosts: Post[] = store
      .getState()
      .posts.ids.reduce<Post[]>((acc, id) => {
        const _post = store.getState().posts.all.get(id)
        if (!_post) {
          throw new Error('This post was not found')
        }
        return acc.concat(_post)
      }, [])
    const posts = computed(() => {
      return allPosts.filter((post) => {
        if (currentPeriod.value === 'Today')
          return post.created.isAfter(moment().subtract(1, 'day'))
        if (currentPeriod.value === 'This Week')
          return post.created.isAfter(moment().subtract(1, 'week'))
        if (currentPeriod.value === 'This Month')
          return post.created.isAfter(moment().subtract(1, 'month'))
      })
    })
    const setPeriod = (period: Period) => {
      currentPeriod.value = period
    }
    return { periods, currentPeriod, posts, setPeriod }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
