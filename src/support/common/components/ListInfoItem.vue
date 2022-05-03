<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex">
    <div
      class="flex glossy list-info-icon shadow-md mr-2"
      :style="{
        backgroundColor: color,
      }"
    >
      <q-icon size="1.8rem" class="m-auto" :name="props.icon" color="dark" />
    </div>
    <div>
      <span :style="{ color: '#84878F' }">
        {{ props.title }}
      </span>
      <p
        class="text-subtitle font-bold"
        :style="{
          fontSize: '1rem',
          color: props.color,
        }"
      >
        {{ props.subtitle }}
      </p>
    </div>
  </div>
</template>

<style lang="sass">
.flex
  .list-info-icon
    border-radius: 10px
    width: 40px
    height: 40px
</style>
