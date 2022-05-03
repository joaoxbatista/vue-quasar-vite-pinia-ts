<template>
  <div class="container q-mt-xl">
    <div class="flex justify-between">
      <BaseBreadcrumb
        v-if="breadcrumbs.length > 0"
        :breadcrumbs="breadcrumbs"
        class="self-center"
      />
      <div class="row justify-end q-mb-lg">
        <slot name="button" />
      </div>
    </div>
    <div>
      <slot name="header">
        <q-card v-show="title" class="q-my-lg q-pa-md">
          <h3 class="text-h5 font-bold">{{ title }}</h3>
        </q-card>
      </slot>
    </div>
    <slot v-if="!cardBody" />
    <q-card v-else :class="bodyClassComputed">
      <slot />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { Breadcrumb } from '@/support/common/types/components'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  cardBody: {
    type: Boolean,
    default: true,
  },
  bodyClass: {
    type: String,
    default: '',
  },
  breadcrumbs: {
    type: Array as PropType<Array<Breadcrumb>>,
    default: () => [],
  },
})

const bodyClassComputed = computed(() => {
  return 'overflow-hidden ' + props.bodyClass
})
</script>
