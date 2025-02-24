<script setup lang="ts">
import type { TimelineEvent, TimelineMetrics } from '../../types'

defineProps<{
  data: TimelineMetrics
}>()

const emit = defineEmits<{
  (event: 'select', record: TimelineEvent): void
}>()
</script>

<template>
  <div border="t base" flex="~ col" h-full of-y-auto text-sm>
    <button
      v-for="event, idx in data.events" :key="idx"
      border="b base" px3 py2
      flex="~ items-center gap-2"
      hover="bg-active"
      @click="emit('select', event)"
    >
      <template v-if="event.type === 'function'">
        <div i-carbon-function op50 />
        <div
          font-mono
          :style="{
            color: event.type === 'function'
              ? getHashColorFromString(event.name, 50, 60)
              : '',
          }"
        >
          {{ event.name }}
        </div>
        <div flex="~" font-mono>
          <div op30>
            (
          </div>
          <template v-for="a, idx in event.args " :key="idx">
            <div v-if="idx" mr2 op30>
              ,
            </div>
            <div op75>
              {{ a === null ? 'null' : a === undefined ? 'undefined' : typeof a === 'function' ? `[function]` : Array.isArray(a) ? '[Array]' : typeof a === 'object' ? '[object]' : JSON.stringify(a) }}
            </div>
          </template>
          <div op30>
            )
          </div>
        </div>
      </template>
      <template v-else>
        <div mr-1 h-7 w-7 flex rounded-lg bg-primary:5 p1 text-green6>
          <div i-carbon-direction-rotary-right ma text-lg />
        </div>
        <div flex="~ col items-start">
          <div text-xs font-mono op30>
            {{ event.from }}
          </div>
          <div font-bold font-mono text-green>
            {{ event.to }}
          </div>
        </div>
      </template>
      <div flex-auto />
      <DurationDisplay
        v-if="event.end"
        :duration="event.end - event.start"
        :color="event.type === 'function'"
      />
    </button>
    <div min-h-100 />
  </div>
</template>
