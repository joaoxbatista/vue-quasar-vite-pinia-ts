import axios from 'axios'

const _axios = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_BASEURL,
  headers: {
    'access-control-allow-origin': '*',
  },
})

export default _axios
