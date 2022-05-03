<script setup lang="ts">
import { twoWayBinding } from '@/support/utils/vue'

const props = defineProps<{
  options: Array<{
    value: string
    label: string
  }>
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue', 'select'])

const localValue = twoWayBinding(props, 'modelValue')

const clickItem = (value: string) => {
  localValue.value = value
  emit('select', value)
}
</script>
<template>
  <q-list>
    <div
      v-for="option in props.options"
      :key="option.label"
      @click="clickItem(option.value)"
    >
      <slot name="item" v-bind="{option, active: localValue == option.value}">
        <q-btn
          class="mx-2"
          rounded
          unelevated
          :class="{ active: localValue == option.value }"
          :label="option.label"
        />
      </slot>
    </div>
  </q-list>
</template>

<style lang="sass" scoped>
.active
  background-color: white !important
  color: #14161d !important

.q-btn
  background-color: #14161d
</style>
