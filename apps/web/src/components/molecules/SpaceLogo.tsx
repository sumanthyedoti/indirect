import { FC } from 'react'
import classnames from 'classnames'

import { Space as SpaceIcon } from '../../icons'
import { Tooltip } from '../molecules'

interface SpaceLogoProps {
  onClick: (id: number) => void
  name: string
  spaceId: number
  isActive?: boolean
  tooltip?: boolean
}

const SpaceLogo: FC<SpaceLogoProps> = ({
  onClick,
  spaceId,
  name,
  isActive = false,
  tooltip = true,
}) => {
  const LogoButton = () => (
    <button
      onClick={() => onClick(spaceId)}
      className={classnames(
        `rounded-xl first:mt-1
              w-12 h-12 lg:w-14 lg:h-14
              bg-slate-900 mb-4 border border-slate-700`,
        {
          'border-2 border-slate-400 focus:ring-2 focus:ring-sky-400': isActive,
          'focus:ring-2 focus:ring-sky-400': !isActive,
        }
      )}
    >
      <SpaceIcon aria-label={name} />
    </button>
  )
  console.log(tooltip)
  if (!tooltip) {
    return <LogoButton />
  }
  return (
    <Tooltip key={spaceId} placement="right" delay={100} label={name}>
      <LogoButton />
    </Tooltip>
  )
}

export default SpaceLogo
