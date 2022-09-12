import axios from 'axios'

export const Axios = axios.create({
  baseURL: process.env.API_URI,
})
