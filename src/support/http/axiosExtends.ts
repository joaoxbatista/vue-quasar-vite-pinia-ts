import { AxiosInstance, Method } from 'axios'

export function sendForm(
  axios: AxiosInstance,
  method: Method,
  url: string,
  data: Record<string, string | Blob | File>
) {
  if (process.env.NODE_ENV === 'test') {
    return axios.request({
      method,
      url,
      data,
    })
  } else {
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key])
    }

    if (method === 'post') {
      return axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } else if (method === 'put') {
      return axios.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } else {
      return axios.request({
        method,
        url,
        data: formData,
      })
    }
  }
}
