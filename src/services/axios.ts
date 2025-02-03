import axios, { type AxiosInstance } from 'axios'

const axiosInstanceGET: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const axiosInstancePOST: AxiosInstance = axios.create({
  baseURL: 'https://api.dominio2.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { axiosInstanceGET, axiosInstancePOST }
