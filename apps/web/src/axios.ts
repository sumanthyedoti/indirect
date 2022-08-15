import axios from 'axios'
import { baseURL } from './config/constants'

export default axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
})
