import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

import App from './App'
import Toaster from './components/Toaster'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import './index.css'

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     suspense: true,
  //   },
  // },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
