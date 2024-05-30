import axios from 'axios'
import config from '../config.ts'

const $host = axios.create({
  baseURL: config.API_URL,
})

export default $host
