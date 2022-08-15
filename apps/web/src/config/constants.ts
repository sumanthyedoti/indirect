export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'ws://localhost:8000'
    : 'https://indirect-app.herokuapp.com'
