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
import { today, thisMonth, thisWeek } from '@/mocks'
import TimelinePost from './TimelinePost.vue'
const wait = (second: number) => new Promise((res) => setTimeout(res, second))

type Period = 'Today' | 'This Week' | 'This Month'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: { TimelinePost },
  async setup() {
    await wait(2000)
    const periods = ['Today', 'This Week', 'This Month']
    const currentPeriod = ref<Period>('Today')
    const posts = computed(() => {
      return [today, thisWeek, thisMonth].filter((post) => {
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
