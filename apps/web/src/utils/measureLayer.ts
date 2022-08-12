import React from 'react'
import ReactDOM from 'react-dom'

const measureElement = (element: React.ReactElement) => {
  console.log(element)
  const container = document.createElement('div')
  document.body.appendChild(container)
  ReactDOM.render(element, container)

  const height = container.clientHeight
  const width = container.clientWidth

  ReactDOM.unmountComponentAtNode(container)
  console.log(height, width)

  return { height, width }
}

export default measureElement
