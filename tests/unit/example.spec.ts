import { mount } from '@vue/test-utils'
import Timeline from '@/components/Timeline.vue'
import { today, thisWeek, thisMonth } from '@/mocks'
import { nextTick } from 'vue'

describe('Timeline', () => {
  it('render today post default', () => {
    const wrapper = mount(Timeline)
    console.log(wrapper.html())
    expect(wrapper.html()).toMatch(today.created.format('Do MMM'))
  })

  it('test user click this week', async () => {
    const wrapper = mount(Timeline)

    await wrapper.get('[data-test="This Week"]').trigger('click')

    await nextTick()

    expect(wrapper.html()).toMatch(today.created.format('Do MMM'))
    expect(wrapper.html()).toMatch(thisWeek.created.format('Do MMM'))
  })

  it('test user click this month', async () => {
    const wrapper = mount(Timeline)

    await wrapper.get('[data-test="This Month"]').trigger('click')

    await nextTick()

    expect(wrapper.html()).toMatch(today.created.format('Do MMM'))
    expect(wrapper.html()).toMatch(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toMatch(thisMonth.created.format('Do MMM'))
  })
})
