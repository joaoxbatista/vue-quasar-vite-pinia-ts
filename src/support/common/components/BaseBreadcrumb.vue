<template>
  <q-breadcrumbs>
    <template #separator>
      <q-icon size="1.5em" name="chevron_right" />
    </template>

    <q-breadcrumbs-el
      v-for="breadcrumb in props.breadcrumbs.slice(0, -1)"
      :key="breadcrumb.label"
      :label="breadcrumb.label"
      :to="breadcrumb.to"
      :active="true"
    />
    <q-breadcrumbs-el
      class="text-primary font-bold"
      :label="props.breadcrumbs[breadcrumbs.length - 1].label"
    />
  </q-breadcrumbs>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Breadcrumb } from '@/support/common/types/components'

const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<Breadcrumb[]>,
    default: () => [],
  },
})
</script>
