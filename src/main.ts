import { createApp } from 'vue'
import { Quasar, Notify, Dialog } from 'quasar'
import router from './router'
import { createPinia } from 'pinia'
import '@quasar/extras/material-icons/material-icons.css'
import './assets/sass/index.sass'
import App from './App.vue'
import { globalComponents } from './support/common/components'
import './index.css'

const vueapp = createApp(App)
  .use(router)
  .use(createPinia())
  .use(Quasar, {
    plugins: {
      Notify,
      Dialog,
    },
    config: {
      notify: {
        position: 'top',
        timeout: 5000,
      },
      dark: true,
    },
  })

globalComponents.forEach(({ name, component }) => {
  vueapp.component(name, component)
})

vueapp.mount('#app')
