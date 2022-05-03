import axios from 'axios'
import useVuelidate, { ValidationArgs } from '@vuelidate/core'
import { useQuasar } from 'quasar'
import { reactive, Ref, ref, UnwrapNestedRefs, watch } from 'vue'
import { vErrorsByKey } from '@/support/utils/vuelidate'
import { Form } from '../types/form'

interface UseFormOptions<T extends object> {
  baseForm: T
  validationRules: ValidationArgs | Ref<ValidationArgs>
  errorMsg?: string
  sucessMsg?: string
  sendFunction: (form: UnwrapNestedRefs<T>) => Promise<unknown>
  beforeSend?: (form: UnwrapNestedRefs<T>) => void
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

interface FormError {
  message: string
  error: boolean
}

export const useForm = <T extends Form>({
  baseForm,
  validationRules,
  errorMsg,
  sucessMsg,
  sendFunction,
  beforeSend,
  onError,
  onSuccess,
}: UseFormOptions<T>) => {
  const $q = useQuasar()
  const loading = ref(false)
  const form = reactive<T>(baseForm)
  const err: { [k in keyof T]: FormError } = JSON.parse(JSON.stringify(form))

  for (const k in err) {
    err[k] = {
      message: '',
      error: false,
    }
  }
  const errors = ref(err)
  const $v = useVuelidate(validationRules, form)

  watch(
    () => $v.value,
    ($v) => {
      for (const key in errors.value) {
        const error = vErrorsByKey($v, key)
        errors.value[key] = {
          message: error.message,
          error: error.error,
        }
      }
    }
  )

  const sendForm = async () => {
    try {
      const isFormValid = await $v.value.$validate()
      if (!isFormValid) {
        return
      }
      loading.value = true
      if (beforeSend) {
        beforeSend(form)
      }
      await sendFunction(form)
      if (onSuccess) {
        onSuccess()
      }
      if (sucessMsg) {
        $q.notify({
          message: sucessMsg,
          type: 'positive',
        })
      }
    } catch (e) {
      if (onError) {
        onError(e)
      }
      if (
        axios.isAxiosError(e) &&
        (e.response?.status == 406 ||
          e.response?.status == 404 ||
          e.response?.status == 409)
      ) {
        $q.notify({
          message: e.response?.data.message,
          type: 'negative',
          caption: e.response?.data.help,
        })
      } else if (axios.isAxiosError(e) && errorMsg) {
        $q.notify({
          message: errorMsg,
          type: 'negative',
        })
      } else {
        throw e
      }
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    loading,
    errors,
    $v,
    sendForm,
  }
}
