import { FC } from 'react'
import userStore from '../store/userStore'

const Space: FC = () => {
  const { isLoggedIn } = userStore()
  return (
    <>
      {isLoggedIn + ''}
      <h1>Space</h1>
    </>
  )
}
export default Space
