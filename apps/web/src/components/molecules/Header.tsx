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
      flex flex-row items-center
      container-width`,
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
