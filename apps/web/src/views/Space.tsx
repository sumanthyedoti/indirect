import { FC } from 'react'
import { Molecules } from '@libs/components'
// import userStore from '../store/userStore'

const Space: FC = () => {
  // const { isLoggedIn } = userStore()
  return (
    <div
      className={`
        flex flex-col w-5/6 w-11/12
        h-screen p-2 mx-auto
        lg:w-2/3 bg-slate-800
        shadow-xl shadow-slate-700/60
        `}
    >
      <div className="h-full mb-2"></div>
      <Molecules.MessageArea />
    </div>
  )
}
export default Space
