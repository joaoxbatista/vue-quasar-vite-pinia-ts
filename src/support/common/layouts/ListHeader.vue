<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  search: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  onEdit: {
    type: Function,
    default: null,
  },
})

const emit = defineEmits(['update:search'])
const searchValue = ref('')
const searchLocal = computed<string>({
  get() {
    return searchValue.value
  },
  set(value) {
    searchValue.value = value
    emit('update:search', value)
  },
})
</script>

<template>
  <q-card v-if="title" class="q-my-lg">
    <div class="row">
      <div class="col-3 flex self-center q-pa-md">
        <h3 class="text-h5 font-bold">{{ props.title }}</h3>
        <q-icon
          v-if="onEdit"
          id="edit"
          class="ml-2 align-bottom"
          color="primary"
          name="edit"
          size="2em"
          @click="() => onEdit()"
        />
      </div>

      <q-separator vertical />
      <div class="col-5 flex space-x-6 justify-center">
        <slot name="list-info" />
      </div>
      <q-separator vertical />
      <div class="col justify-end self-center q-pa-md">
        <q-input
          v-model="searchLocal"
          data-cy="search-input"
          debounce="500"
          standout
          dense
          placeholder="Buscar..."
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
  </q-card>
</template>

<style>
#edit {
  cursor: pointer;
}
</style>
