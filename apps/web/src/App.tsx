import React, { FC, useState } from 'react'
import { Button } from '@libs/components'
const LazyComponent = React.lazy(() => import('./Load'))

import img from './image.png'
import logo from './react-icon.svg'

const App: FC = () => {
  const [count, setCount] = useState<number>(0)
  return (
    <div>
      <h1>{process.env.NODE_ENV}</h1>
      <h1 className="text-3xl">My App</h1>
      <Button
        label={`clicks: ${count}`}
        onClick={() => setCount((count) => count + 1)}
      />
      <img src={img} width="300" height="200" alt="" />
      <img src={logo} width="200" height="200" alt="" />
      <React.Suspense>
        <LazyComponent />
      </React.Suspense>
    </div>
  )
}

export default App
