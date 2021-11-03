<template>
  <suspense>
    <template #default>
      <!--  This component's setup function must be wrap by async/await        -->
      <Timeline />
    </template>
    <template #fallback> <Spinner /> </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Spinner from './components/Spinner.vue'
import Timeline from './components/Timeline.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Timeline,
    Spinner,
  },
})
</script>
