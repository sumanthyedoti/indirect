import { FC } from 'react'
import classnames from 'classnames'

import AvatarMenu from '../AvatarMenu'
import { useUserStore } from '../../store'

const Header: FC = () => {
  const { isLoggedIn } = useUserStore()
  return (
    <header
      role="banner"
      className={classnames(
        `
      flex sm:flex-row sm:items-center
      p-5 mx-auto sm:px-5 md:px-0 md:w-4/5 lg:w-3/5`,
        {
          'justify-between': isLoggedIn,
          'justify-center': !isLoggedIn,
        }
      )}
    >
      <h1 className="mb-0 text-4xl font-light text-white">inDirect</h1>
      {isLoggedIn && (
        <div className="w-10 h-10">
          <AvatarMenu />
        </div>
      )}
    </header>
  )
}

export default Header
