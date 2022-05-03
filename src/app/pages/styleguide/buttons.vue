<template>
  <div class="q-pa-lg q-gutter-sm">
    <h2 class="text-h2">Buttons</h2>
    <q-toggle
      v-model="isDark"
      color="yellow-2"
      label="Dark mode"
      keep-color
      @click="$q.dark.toggle()"
    />
    <h4 class="q-mb-sm">Elevado</h4>
    <div class="q-gutter-sm">
      <q-btn color="primary" label="Glossy" icon="add" />
      <q-btn color="secondary" label="Glossy" icon="remove" />
      <q-btn color="positive" label="Glossy" icon="check" />
      <q-btn color="info" label="Glossy" icon="info" />
      <q-btn color="negative" label="Glossy" icon="error" />
    </div>

    <h4 class="q-mb-sm">Normal</h4>
    <div class="q-gutter-sm">
      <q-btn unelevated color="primary" label="Glossy" icon="add" />
      <q-btn unelevated color="secondary" label="Glossy" icon="remove" />
      <q-btn unelevated color="positive" label="Glossy" icon="check" />
      <q-btn unelevated color="info" label="Glossy" icon="info" />
      <q-btn unelevated color="negative" label="Glossy" icon="error" />
    </div>

    <h4 class="q-mb-sm">Glossy</h4>
    <div class="q-gutter-sm">
      <q-btn glossy unelevated color="primary" label="Glossy" icon="add" />
      <q-btn glossy unelevated color="secondary" label="Glossy" icon="remove" />
      <q-btn glossy unelevated color="positive" label="Glossy" icon="check" />
      <q-btn glossy unelevated color="info" label="Glossy" icon="info" />
      <q-btn glossy unelevated color="negative" label="Glossy" icon="error" />
    </div>

    <h4 class="q-mb-sm">Flat</h4>
    <div class="q-gutter-sm">
      <q-btn flat unelevated color="primary" label="Glossy" icon="add" />
      <q-btn flat unelevated color="secondary" label="Glossy" icon="remove" />
      <q-btn flat unelevated color="positive" label="Glossy" icon="check" />
      <q-btn flat unelevated color="info" label="Glossy" icon="info" />
      <q-btn flat unelevated color="negative" label="Glossy" icon="error" />
    </div>

    <h4 class="q-mb-sm">Outline</h4>
    <div class="q-gutter-sm">
      <q-btn outline unelevated icon="add" label="Glossy" />
      <q-btn outline unelevated color="primary" icon="add" label="Glossy" />
      <q-btn
        outline
        unelevated
        color="secondary"
        icon="remove"
        label="Glossy"
      />
      <q-btn outline unelevated color="positive" icon="check" label="Glossy" />
      <q-btn outline unelevated color="info" icon="info" label="Glossy" />
      <q-btn outline unelevated color="negative" icon="error" label="Glossy" />
    </div>

    <h4 class="q-mb-sm">Rounded</h4>
    <div class="q-gutter-sm">
      <q-btn round unelevated color="primary" icon="add" />
      <q-btn round unelevated color="secondary" icon="remove" />
      <q-btn round unelevated color="positive" icon="check" />
      <q-btn round unelevated color="info" icon="info" />
      <q-btn round unelevated color="negative" icon="error" />
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const isDark = ref(false)
const $q = useQuasar()
</script>

<style></style>
