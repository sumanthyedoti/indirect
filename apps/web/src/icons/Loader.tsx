import { SVGProps } from 'react'

interface Props {
  width?: string
  height?: string
  color?: string
}

const SvgComponent = ({
  width = '40px',
  height = '40px',
  color = 'currentColor',
}: SVGProps<Props>) => (
  <svg
    width={width}
    height={height}
    className="mb-1"
    viewBox="0 0 60 60"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
  >
    <g transform="translate(1 1)" fill="#f1f5f9" fillRule="evenodd">
      <circle cx={5} cy={50} r={8}>
        <animate
          attributeName="cy"
          begin="0s"
          dur="2.2s"
          values="50;5;50;50"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          begin="0s"
          dur="2.2s"
          values="5;27;49;5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={27} cy={5} r={8}>
        <animate
          attributeName="cy"
          begin="0s"
          dur="2.2s"
          from={5}
          to={5}
          values="5;50;50;5"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          begin="0s"
          dur="2.2s"
          from={27}
          to={27}
          values="27;49;5;27"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={49} cy={50} r={8}>
        <animate
          attributeName="cy"
          begin="0s"
          dur="2.2s"
          values="50;50;5;50"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          from={49}
          to={49}
          begin="0s"
          dur="2.2s"
          values="49;5;27;49"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
)

export default SvgComponent
