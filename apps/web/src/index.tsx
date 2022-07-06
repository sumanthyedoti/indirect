import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import '@libs/components/lib/index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

export { App }
