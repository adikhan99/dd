import { getLocalStorageToken, removeLocalStorageToken } from '@utils/auth-utils'
import { decryptApi } from '@utils/helper-functions'
import axios from 'axios'
import Router from 'next/router'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

// Change request data/error here
http.interceptors.request.use(
  async config => {
    const token = getLocalStorageToken();

    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Change response data/error here
http.interceptors.response.use(
  async response => {
    if (response?.data?.iv) {
      const result = await decryptApi(response?.data?.encryptedData, response?.data?.iv, process.env.NEXT_PUBLIC_API_DECRYPT_SECRET_KEY);
      response.data = JSON.parse(result);
    }
    return response
  },
  error => {
    if ((error.response && (error.response.status === 401 || error.response.status === 403))) {
      removeLocalStorageToken();
      Router.push("/")
    }
    // network error
    if (!error.response) {
      // setNetworkError(true)
    }
    return Promise.reject(error)
  }
)

export default http
