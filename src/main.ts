import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

import { today, thisWeek, thisMonth } from '@/mocks'

const wait = (second: number) => new Promise((res) => setTimeout(res, second))
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.get = async (url: string) => {
  if (url !== '/posts') return
  await wait(1500)
  return Promise.resolve({ data: [today, thisWeek, thisMonth] })
}

createApp(App).mount('#app')
