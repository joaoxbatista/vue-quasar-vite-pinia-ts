import axios from 'axios'
import { invalidTokenInterceptor, insertTokenInterceptor } from './interceptors'

const _axios = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_BASEURL,
  headers: {
    'access-control-allow-origin': '*',
  },
})

_axios.interceptors.request.use(insertTokenInterceptor)
_axios.interceptors.response.use(undefined, (error) => {
  return invalidTokenInterceptor(error, _axios)
})

export default _axios
