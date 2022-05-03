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
    innerLabel: {
      type: Boolean,
      default: false,
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
  <label v-if="!innerLabel" class="q-mb-md block">{{ label }}</label>
  <q-input
    :label="innerLabel ? label : undefined"
    :model-value="modelValue"
    v-bind="attrs"
    standout
    :error-message="errorMessage"
    :error="hasError"
  >
    <template v-for="(_, name) in ($slots as {})" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </q-input>
</template>
