<template>
  <div class="login-page">
    <div class="col-12 col-md-6">
      <div class="row justify-center h-full items-center">
        <div class="col-md-6">
          <h2 class="title text-h5 q-mb-xl">Login</h2>
          <form @submit.prevent="sendForm">
            <q-input
              v-model="form.username"
              name="username"
              label="Login"
              data-cy="username"
              :error-message="errors.username.message"
              :error="errors.username.error"
            />
            <q-input
              v-model="form.password"
              label="Senha"
              type="password"
              data-cy="password"
              :error-message="errors.password.message"
              :error="errors.password.error"
            />
            <div class="q-mt-lg text-center">
              <q-btn
                :loading="loading"
                label="Entrar"
                glossy
                color="primary"
                size="md"
                class="q-px-lg"
                type="submit"
                data-cy="submit"
              />
              <p class="q-mt-xl text-xs text-gray-400">
                Copyright © {{ new Date().getFullYear() }} <br />
                Todos os direitos reservados
              </p>
              <img class="block mx-auto q-mt-lg" src="" alt="" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { required } from '@/support/utils/vuelidate/i18n-validators'
import { useForm } from '@/support/common/composables/form'

export default defineComponent({
  name: 'IndexAuth',
  setup() {
    // const router = useRouter()

    // if (authStore.isAuthenticated()) {
    //   router.push('/')
    // }

    const baseForm = {
      username: '',
      password: '',
    }
    const validationRules = {
      username: { required },
      password: { required },
    }

    const onSuccess = () => {
      // router.push('')
    }

    const { sendForm, loading, errors, form } = useForm({
      baseForm,
      validationRules,
      errorMsg: 'Erro ao tentar fazer login',
      onSuccess: onSuccess,
      sendFunction: async () => {
        console.log(form)
      },
    })

    return { form, sendForm, loading, errors }
  },

  onMounted: () => {
    alert('entrou')
  },
})
</script>

<style lang="sass">
.banner
  display: block
  height: 100%
  width: 100%
  background-color: $dark-page
  border-top-right-radius: 100px

.title
  text-align: center
  text-transform: uppercase
  font-weight: bold
  display: block

  &::after
    content: ''
    width: 50px
    height: 4px
    display: block
    margin: 9px auto 0 auto
    background: linear-gradient(179.6deg, #FF5733 0.35%, rgba(34, 37, 45, 0) 360.34%)
    background: -moz-linear-gradient(179.6deg, #FF5733 0.35%, rgba(34, 37, 45, 0) 360.34%)
    border-radius: 77px
</style>
