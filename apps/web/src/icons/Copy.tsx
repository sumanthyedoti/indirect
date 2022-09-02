import { SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 512 512"
    {...props}
  >
    <title>{'Copy'}</title>
    <rect
      x={128}
      y={132}
      width={336}
      height={336}
      rx={57}
      ry={59}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <path
      d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
  </svg>
)

export default SvgComponent
