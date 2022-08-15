import axios from 'axios'

const env = process.env.NODE_ENV || 'development'

export default axios.create({
  baseURL:
    env === 'development'
      ? 'http://localhost:8000/api'
      : 'https://indirect-app.herokuapp.com/api',
  withCredentials: true,
})
