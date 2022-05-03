<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title>New project</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      :width="200"
      :mini-width="75"
      :breakpoint="500"
      bordered
      dark
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item v-ripple clickable to="/styleguide/buttons">
            <q-item-section avatar>
              <q-icon name="gamepad" />
            </q-item-section>
            <q-item-section> Botões </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'StyleguideLayout',
  setup: () => {
    const router = useRouter()
    console.log({
      router: router.options.routes
    })
  },
  data() {
    return {
      drawer: ref(false),
      miniState: ref(true),
    }
  }
})
</script>
