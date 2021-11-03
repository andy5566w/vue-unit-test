import { mount, flushPromises } from '@vue/test-utils'
import Timeline from '@/components/Timeline.vue'
import { getTestData, today, thisWeek, thisMonth } from '@/mocks'
import { nextTick } from 'vue'
const apiData = getTestData()
jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: apiData,
    })
  },
}))

describe('Timeline', () => {
  it.only('render today post default', async () => {
    const wrapper = mount({
      components: { Timeline },
      template: `
        <suspense>
          <template #default>
            <timeline/>
          </template>
          <template #fallback>
            Loading...
          </template>
        </suspense>
      `,
    })

    // nextTick -> Vue internal promises
    // axios -> flushPromise, external promise
    await flushPromises()
    await nextTick()
    console.log(wrapper.html())
    // expect(wrapper.html()).toMatch(today.created.format('Do MMM'))
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
