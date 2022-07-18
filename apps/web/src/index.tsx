import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import App from './App'

import './index.css'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
        <Toaster />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)

export { App }
