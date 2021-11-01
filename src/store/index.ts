import { reactive, readonly } from 'vue'
import { Post } from '@/mocks'

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
}
const state = new Store({
  posts: {
    ids: [],
    all: new Map(),
    load: false,
  },
})

export default state
