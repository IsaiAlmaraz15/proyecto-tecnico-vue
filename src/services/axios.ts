import axios, { type AxiosInstance } from 'axios'

// Crear una instancia básica de Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/', // Base URL por defecto (puedes cambiarla si es necesario)
  timeout: 5000, // Tiempo límite para las solicitudes
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
