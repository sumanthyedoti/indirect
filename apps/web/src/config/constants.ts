export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://indirect-app.herokuapp.com'

export const wsURL =
  process.env.NODE_ENV === 'development'
    ? 'ws://localhost:8000'
    : 'ws://indirect-app.herokuapp.com'
