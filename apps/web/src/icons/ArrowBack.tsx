import { SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={48}
      d="M244 400 100 256l144-144M120 256h292"
    />
  </svg>
)

export default SvgComponent
