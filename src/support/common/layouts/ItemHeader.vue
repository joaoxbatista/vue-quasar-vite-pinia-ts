<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  includeDelete: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['delete'])
</script>

<template>
  <q-card v-if="title">
    <div class="row">
      <div class="col-3 self-center q-pa-md">
        <h3 class="text-h5 font-bold">{{ props.title }}</h3>
      </div>
      <q-separator v-if="'content' in $slots" vertical />
      <div class="col">
        <div>
          <slot name="content"> </slot>
        </div>

        <!--      <div class="col-5 q-pa-md">-->
        <!--        <slot name="list-info" />-->
        <!--      </div>-->

        <div v-if="includeDelete" class="flex justify-end self-center">
          <q-separator vertical />
          <q-btn
            color="primary"
            dense
            flat
            size="lg"
            icon="delete"
            class="q-pa-md"
            @click="emit('delete')"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>
