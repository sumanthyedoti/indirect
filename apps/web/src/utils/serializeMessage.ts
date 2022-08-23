import escapeHtml from 'escape-html'
import { Text } from 'slate'

const serializeNode = (node: any) => {
  if (Text.isText(node)) {
    const string = escapeHtml(node.text)
    if (node.bold) {
      return `<strong>${string}</strong>`
    }
    return `<span>${string}</span>`
  }
  //@ts-ignore
  const children = node.children.map((n: any) => serializeNode(n)).join('')

  switch (node.type) {
    case 'paragraph':
      return `<p>${children}</p>`
    case 'code':
      return `<code>${children}</code>`
    // case 'quote':
    //   return `<blockquote><p>${children}</p></blockquote>`
    // case 'link':
    //   return `<a href="${escapeHtml(node.url)}">${children}</a>`
    default:
      return children
  }
}
const serializeMessage = (nodes: any) => {
  const htmlElements: any = []
  for (let i = 0; i < nodes.length; ) {
    const preChildren = []
    for (; nodes[i]?.type === 'code'; i++) {
      preChildren.push(serializeNode(nodes[i]))
    }
    if (preChildren.length) {
      htmlElements.push(`<pre>${preChildren.join('<br/>')}</pre>`)
    }
    nodes[i] && htmlElements.push(serializeNode(nodes[i]))
    i++
  }
  return htmlElements.join('')
}

export default serializeMessage
