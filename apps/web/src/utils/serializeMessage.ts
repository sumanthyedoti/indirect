import escapeHtml from 'escape-html'
import { Text, Node } from 'slate'

const serializeNode = (node: any) => {
  if (Text.isText(node)) {
    const string = escapeHtml(node.text)
    if (node.bold) {
      return `<strong>${string}</strong>`
    }
    if (!Node.string(node).length) return `<br />`
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
  let conseqEmptyLines = 0
  let contentStarted = false
  for (let i = 0; i < nodes.length; i++) {
    const length = Node.string(nodes[i]).length
    if (!length) {
      conseqEmptyLines++
    }
    if (conseqEmptyLines > 2 && !length) {
      continue
    }
    if (length) {
      contentStarted = true
      conseqEmptyLines = 0
    }
    const preChildren = []
    for (; nodes[i]?.type === 'code'; i++) {
      preChildren.push(serializeNode(nodes[i]))
    }
    if (preChildren.length) {
      htmlElements.push(`<pre>${preChildren.join('<br/>')}</pre>`)
    }
    contentStarted && htmlElements.push(serializeNode(nodes[i]))
  }
  return htmlElements.join('')
}

export default serializeMessage
