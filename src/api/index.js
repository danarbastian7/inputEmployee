import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
})

export const jsonServerApi = axios.create({
  baseUrl: "http://localhost:2000",
})

export const employeeApi = axios.create({
  baseURL: "http://localhost:4000",
})

export default axiosInstance
