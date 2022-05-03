<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: number | string | Array<number | string> | null | unknown
  label?: string
  errorMessage?: string
  dataCy?: string
  innerLabel?: boolean
}>()

const hasError = computed(() => !!props.errorMessage)
</script>

<template>
  <div>
    <label v-if="label && !innerLabel" class="q-mb-md block">{{ label }}</label>
    <q-select
      :model-value="modelValue"
      :label="innerLabel ? label : undefined"
      v-bind="$attrs"
      standout
      emit-value
      map-options
      :error-message="errorMessage"
      :error="hasError"
      :popup-content-class="dataCy || 'select-cy'"
      :data-cy="dataCy || 'select-cy'"
    >
      <template #no-option>
        <q-item>
          <q-item-section class="text-grey">Sem resultados</q-item-section>
        </q-item>
      </template>
      <template v-for="(_, name) in ($slots as {})" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </q-select>
  </div>
</template>
