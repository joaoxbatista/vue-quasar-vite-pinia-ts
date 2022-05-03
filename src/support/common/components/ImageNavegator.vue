<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  images: { label: string; url: string }[]
  current?: number
  loading?: boolean
  vertical?: boolean
}>()

const emit = defineEmits(['update:current'])

const currentImage = ref(props.current)

watch(
  () => props.current,
  (newValue) => {
    if (newValue !== currentImage.value) {
      currentImage.value = newValue
    }
  }
)

watch(
  () => currentImage.value,
  (newValue) => {
    emit('update:current', newValue)
  }
)

watch(
  () => props.images,
  (newValue) => {
    if (currentImage.value && currentImage.value >= newValue.length) {
      currentImage.value = 0
    }
  }
)

const getClass = (index: number) => {
  if (index === currentImage.value) {
    return 'active'
  }
  return 'inactive'
}

const setCurrentImage = (index: number) => {
  currentImage.value = index
}
</script>

<template>
  <div
    class="image-navegator flex flex-nowrap overflow-auto justify-center"
    :class="{
      'flex-col': props.vertical,
    }"
  >
    <template v-if="!loading">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="getClass(index)"
        class="image-navegator__image flex-none mx-2 mt-4"
        @click="setCurrentImage(index)"
      >
        <img
          :src="image.url"
          class="w-48 h-32 shadow hover:shadow-lg rounded-md m-auto"
        />
        <div class="w-48 text-center ellipsis">
          {{ image.label }}
        </div>
      </div>
    </template>
    <div v-else class="flex-none mx-2 mt-4">
      <q-skeleton
        width="100px"
        height="50px"
        class="w-48 h-32 shadow hover:shadow-lg rounded-md"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.image-navegator
  max-height: 600px

.image-navegator__image
  cursor: pointer

.active
  border-radius: 10px
  border: 2px solid #ffffff
  opacity: 1


.image-navegator__image:hover
  opacity: 0.8


.inactive
  opacity: 0.5
</style>
