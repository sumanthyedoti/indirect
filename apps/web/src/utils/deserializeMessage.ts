const deserializeNode = (el: any) => {
  if (el.tagName === 'SPAN') {
    return { text: el.innerText }
  }
  if (el.tagName === 'STRONG') {
    return { text: el.innerText, bold: true }
  }
  const children: any[] = []
  for (const child of el.children) {
    children.push(deserializeNode(child))
  }

  switch (el.tagName) {
    case 'P':
      return {
        type: 'paragraph',
        children,
      }
    case 'CODE':
      return {
        type: 'code',
        children,
      }
    default:
      return children
  }
}
const deserializeMessage = (html: string) => {
  const dom = document.createElement('div')
  const json = []
  dom.innerHTML = html
  if (!dom.children.length) {
    json.push({ text: 'paragraph', children: { text: dom.innerText } })
  }
  for (const el of dom.children) {
    if (el.tagName === 'PRE') {
      for (const child of el.children) {
        json.push(deserializeNode(child))
      }
    } else {
      json.push(deserializeNode(el))
    }
  }

  return json
}

export default deserializeMessage
