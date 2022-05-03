import { QVueGlobals, useQuasar } from 'quasar'
import { ref, Ref } from 'vue'
import axios, { AxiosError } from 'axios'

interface FetchParams {
  errorMsg?: string
  successMsg?: string
  beforeSend?: () => void
  onSuccess?: () => void
  onError?: (error: AxiosError) => void
}

const fetchCount = ref(0)

function fetchWrapper<T, G extends Array<unknown>>(
  fn: (...args: G) => Promise<T>,
  { beforeSend, onSuccess, onError, errorMsg, successMsg }: FetchParams,
  loading: Ref<boolean>,
  $q: QVueGlobals
) {
  return async (...args: G) => {
    try {
      fetchCount.value++
      loading.value = true
      if (beforeSend) {
        beforeSend()
      }
      const resp = await fn(...args)
      if (onSuccess) {
        onSuccess()
      }
      if (successMsg) {
        $q.notify({
          message: successMsg,
          color: 'positive',
        })
      }
      return resp
    } catch (e) {
      fetchCount.value = 1
      if (onError && axios.isAxiosError(e)) {
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
      }
      throw e
    } finally {
      fetchCount.value--
      if (fetchCount.value == 0) {
        loading.value = false
      }
    }
  }
}

export const useFetch = <T, G extends Array<unknown>>(
  fn: (...args: G) => Promise<T>,
  fetchParams?: FetchParams
) => {
  const $q = useQuasar()
  const loading = ref(false)
  const fetch = fetchWrapper(fn, fetchParams || {}, loading, $q)
  return {
    fetch,
    loading,
  }
}

export const useGlobalFetch = (globalFetchParams?: FetchParams) => {
  const $q = useQuasar()
  const loading = ref(false)
  const fetch = <T>(fn: () => Promise<T>, fetchParams?: FetchParams) => {
    return fetchWrapper(
      fn,
      { ...globalFetchParams, ...fetchParams },
      loading,
      $q
    )()
  }
  return {
    fetch,
    loading,
  }
}
