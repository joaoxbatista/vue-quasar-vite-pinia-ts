<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs }) {
    const hasError = computed(() => props.errorMessage !== '')
    return {
      attrs,
      hasError,
    }
  },
})
</script>

<template>
  <label class="q-mb-md block">{{ label }}</label>
  <q-field
    :model-value="modelValue"
    v-bind="attrs"
    standout
    :error-message="errorMessage"
    :error="hasError"
  >
    <template #append>
      <slot name="append" />
    </template>

    <template #control>
      <slot name="control" />
    </template>
  </q-field>
</template>
