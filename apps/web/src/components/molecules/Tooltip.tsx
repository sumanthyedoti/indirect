import Tippy from '@tippyjs/react'
import { Placement } from 'tippy.js'

interface ToolTipProps {
  children: JSX.Element
  label: string
  delay?: number
  placement?: Placement
  animation?: string
  trigger?: string
  timer?: boolean
  arrow?: boolean
}
const Tooltip = ({
  label,
  children,
  delay = 350,
  timer = false,
  trigger = 'mouseenter',
  animation = 'scale',
  placement = 'bottom',
  arrow = true,
}: ToolTipProps) => {
  return (
    <Tippy
      arrow={arrow}
      onShow={(instance) => {
        if (timer) {
          setTimeout(() => {
            instance.hide()
          }, 2000)
        }
      }}
      animation={animation}
      placement={placement}
      theme="light"
      content={label}
      delay={delay}
      trigger={trigger}
    >
      {children}
    </Tippy>
  )
}

export default Tooltip
