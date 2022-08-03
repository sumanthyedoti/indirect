import Tippy from '@tippyjs/react'
import { Placement } from 'tippy.js'

interface ToolTipProps {
  children: JSX.Element
  label: string
  delay?: number
  placement?: Placement
  arrow?: boolean
}
const Tooltip = ({
  label,
  children,
  delay = 350,
  placement = 'bottom',
  arrow = true,
}: ToolTipProps) => {
  return (
    <Tippy
      arrow={arrow}
      placement={placement}
      theme="light"
      content={label}
      delay={delay}
      trigger="mouseenter"
    >
      {children}
    </Tippy>
  )
}

export default Tooltip
