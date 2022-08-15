import axios from 'axios'

const env = process.env.NODE_ENV || 'development'

export default axios.create({
  baseURL:
    env === 'development'
      ? 'http://localhost:8000'
      : 'https://indirect-app.herokuapp.com',
  withCredentials: true,
})
