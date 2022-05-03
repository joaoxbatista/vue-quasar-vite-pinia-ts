## Composable useForm

Ao criar um formulário talvez seja necessário que exista funcionalidades como: checar se o formulário é válido, mostrar mensagens de erro ou sucesso, etc.
Para isso o utilitario `useForm` pode ser usado.

```typescript
import { useForm } from '@/utils/useForm'

const {
  form, // Formulário
  loading, // indica se o formulário está sendo enviado
  errors, // erros de validação do formulário
  $v, // objeto vuelidate
  sendForm, // função para enviar o formulário
} = useForm({
  /*
   * Formulário base com os campos que serão utilizados
   */
  baseForm: {
    name: '',
    email: '',
    password: '',
  },
  /*
   * Regras de validação para cada campo do formulário
   * Essas regras são derivadas do vuelidate (https://vuelidate-next.netlify.app/validators.html)
   */
  validationRules: {
    name: { required },
    password: { required },
  },
  /*
   * Função que será executada antes de enviar o formulário
   * Essa função pode ser utilizada para fazer alguma modifição antes de enviar o formulário
   */
  beforeSend: (form) => {},
  /*
   * Mensagem de erro que vai aparecer no popup caso o formulário não seja enviado
   */
  errorMsg: 'Erro ao enviar o formulário',
  /*
   * Mensagem de sucesso que vai aparecer no popup caso o formulário seja enviado com sucesso
   */
  sucessMsg: 'Formulário enviado com sucesso',
  /*
   * Função que será chamada para enviar o formulário
   */
  sendFunction: async (form) => {
    await axios.post('/api/users', form)
  },
  /*
   * Função que será chamada caso o formulário seja enviado com sucesso
   */
  onSuccess: () => {
    console.log('success')
  },
  /*
   * Função que será chamada caso o formulário não seja enviado com sucesso
   */
  onError: (e) => {
    console.log('error', e)
  },
})
```

Exemplo de uso para um formulário de login

```typescript
<script lang="ts" setup>
import { useForm } from '@/utils/useForm'
import { useAuthStore } from '@/domains/auth/store'
import { useRouter } from 'vue-router'
import { required } from '@/support/utils/vuelidate/i18n-validators'
import { useForm } from '@/support/common/composables/form'
import { LoginForm } from '@/domains/auth/interface'

const authStore = useAuthStore()
router = useRouter()

const { sendForm, loading, errors, form } = useForm<LoginForm>({
  baseForm: {
    username: '',
    password: '',
  },
  validationRules: {
    username: { required },
    password: { required },
  },
  errorMsg: 'Erro ao tentar fazer login',
  onSuccess: () => {
    router.push('/quicksight')
  },
  sendFunction: authStore.login,
})
</script>

<template>
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
</template>

```

Nesse exemplo as regras de validação custom foram derivadas do [vuelidate](https://vuelidate-next.netlify.app/custom_validators.html). Os errors são gerados pelo vuelidate, existindo um objeto de erro para cada campo do formulário.
