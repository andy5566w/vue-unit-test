import { mount } from '@vue/test-utils'
import Timeline from '@/components/Timeline.vue'
import { today } from '@/mocks'

describe('Timeline', () => {
  it('render today post default', () => {
    const wrapper = mount(Timeline)
    console.log(wrapper.html())
    expect(wrapper.html()).toMatch(today.created.format('Do MMM'))
  })
})
