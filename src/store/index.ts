import { reactive, readonly } from 'vue'
import { Post } from '@/mocks'
import axios from 'axios'
import { today, thisMonth, thisWeek } from '@/mocks'

interface State {
  posts: PostsState
}

interface PostsState {
  ids: string[]
  all: Map<string, Post>
  load: boolean
}

class Store {
  private state: State

  constructor(init: State) {
    this.state = reactive(init)
  }

  getState() {
    return readonly(this.state)
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/post')
    const postsState: PostsState = {
      ids: [],
      all: new Map(),
      load: false,
    }

    // To prevent vue to travel all of virtual DOM
    for (const post of response.data) {
      postsState.ids.push(post.id)
      postsState.all.set(post.id, post)
    }

    this.state.posts = postsState
  }
}

const all = new Map<string, Post>()
all.set(today.id, today)
all.set(thisWeek.id, thisWeek)
all.set(thisMonth.id, thisMonth)
const state = new Store({
  posts: {
    ids: [today.id, thisWeek.id, thisMonth.id],
    all,
    load: false,
  },
})

// use
// composable
// provide inject
export function useStore(): Store {
  return state
}
