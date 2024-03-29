import { StrictMode, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

// import App from './App'
const App = lazy(() => import('./App'))
import Toaster from './components/Toaster'
// import { LogoLoader } from './components/molecules'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import './index.css'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="h-screen">
          <Suspense fallback={null}>
            <App />
          </Suspense>
        </div>
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
