<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header>
      <q-toolbar>
        <div class="q-toolbar__toggle">
          <q-btn
            flat
            unelevated
            :ripple="false"
            dense
            icon="menu"
            @click="drawer = !drawer"
          />
        </div>
        <q-toolbar-title>
          <div class="q-toolbar__logo">
            <a href="/quicksight">
              <img src="" alt="Logo New project" />
            </a>
          </div>
        </q-toolbar-title>
        <!-- <q-btn-dropdown
          data-cy="user-dropdown"
          flat
          unelevated
          :ripple="false"
          :label="
            authStore.user?.user.pessoa?.nome || 'Usuário não identificado'
          "
        >
          <q-list>
            <q-item v-close-popup data-cy="logout" clickable @click="logout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->
        <!--
        <q-toggle v-model="darkMode" label="Dark" color="blue" />
-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      :width="250"
      :mini-width="75"
      :breakpoint="500"
      bordered
      dark
      mini-to-overlay
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            v-for="item in sideItems"
            :key="item.route.path"
            v-ripple
            :active="item.active"
            clickable
            @click="item.route.push({})"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
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
import { useRoutes } from '@/router'
import { useQuasar } from 'quasar'
import { reactive, ref, watch } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardLayout',
  setup() {
    const $q = useQuasar()
    const darkMode = ref(true)
    // const route = useRoute()
    const routes = useRoutes()

    const sideItems = reactive([
      {
        icon: 'location_city',
        label: 'Empresas',
        route: routes.LOGIN,
        active: false,
      },
    ])

    $q.dark.set(darkMode.value)

    const logout = () => {
      routes.LOGIN.push({})
    }

    watch(
      () => darkMode.value,
      (value: boolean) => {
        $q.dark.set(value)
      }
    )

    // watch(
    //   () => route.fullPath,
    //   (path: string) => {
    //     sideItems.forEach((item) => {
    //       item.active = path.startsWith(item.route.resolve({}).fullPath)
    //     })
    //   },
    //   { immediate: true }
    // )

    return {
      darkMode,
      routes,
      drawer: ref(false),
      miniState: ref(true),
      sideItems,
      logout,
    }
  },
})
</script>

<style lang="sass">
body.body--dark .q-header, body.body--dark .q-footer, body.body--dark .q-drawer
  background: $dark
  border-color: transparent
  box-shadow: 0px 8px 16px 4px rgba(0, 0, 0, 0.2)

.q-header
  height: 64px
  align-items: center
  display: flex

  .block
    color: $img-content-color

  .q-toolbar__toggle
    width: 60px
    display: flex
    justify-content: center
    align-items: center

    .q-icon
      color: $primary

  .q-toolbar__logo
    margin-left: 14px
    img
      height: 26px

.q-drawer
  .q-drawer__content
    padding-top: 24px
  .q-item
    color: #84878F
    height: 56px
    min-width: 72px

  .q-item.q-router-link--active, .q-item--active
    color: $primary
    font-weight: 700

    .q-item__section
      &::before
        content: ''
        height: 24px
        width: 2px
        background-color: $primary
        position: absolute
        left: 0px

      .q-icon
        background-color: $primary
        background-image: linear-gradient(rgba($dark, 0), rgba($dark, .8) 120.6%)
        height: 40px
        width: 40px
        border-radius: 8px
        color: $dark
</style>
