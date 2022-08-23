import { useCallback, useEffect, FC } from 'react'
import { useQueryClient } from 'react-query'
import escapeHtml from 'escape-html'
import { Text } from 'slate'

import { Message as MessageT } from '@api-types/messages'
import Header from './Header'
import { useSocket } from '../../hooks'
import ChannelMessages from './ChannelMessages'
import MessageInput from './MessageInput'
import useUserStore from '../../store/useUserStore'

const Channel: FC = () => {
  const { user, channelId } = useUserStore()
  const queryClient = useQueryClient()
  const socket = useSocket()
  useEffect(() => {
    socket.on('message-failed', onMessageFail)
    socket.on('message-success', onMessageSuccess)
    return () => {
      socket.off('message-failed', onMessageFail)
      socket.off('message-success', onMessageSuccess)
    }
  }, [])

  const onMessageFail = (tempId: number, channelId: number) => {
    console.log('message-failed')
    queryClient.setQueryData<MessageT[] | undefined>(
      ['channel-messages', channelId],
      (messages) => messages?.filter((message) => message.id !== tempId)
    )
  }

  const onMessageSuccess = (tempId: number, message: MessageT) => {
    console.log('message-success')
    // queryClient.invalidateQueries(['channel-messages', channelId])
    queryClient.setQueryData<MessageT[] | undefined>(
      ['channel-messages', message.channel_id],
      (messages) => {
        const storedMessage = messages?.find((msg) => msg.id === message.id)
        if (!storedMessage && !!messages) {
          return [...messages?.filter((msg) => msg.id !== tempId), message]
        }
        return messages
      }
    )
  }

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
  const serializeNodes = (nodes: any) => {
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

  const deserializeHtmlToSlate = (html: string) => {
    const dom = document.createElement('div')
    const json = []
    dom.innerHTML = html

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

    for (const el of dom.children) {
      if (el.tagName === 'PRE') {
        for (const child of el.children) {
          json.push(deserializeNode(child))
        }
      } else {
        json.push(deserializeNode(el))
      }
    }
    console.log(json)
  }

  const handleMessageSubmit = useCallback(
    (input: any[]) => {
      console.log(input)
      const html = serializeNodes(input)
      deserializeHtmlToSlate(html)
      console.log(html)

      const tempId = Date.now()
      queryClient.setQueryData<MessageT[] | undefined>(
        ['channel-messages', channelId],
        //@ts-ignore
        (oldData) => {
          if (!oldData) {
            return [
              {
                id: tempId,
                html,
                json_stringified: JSON.stringify(input),
                sender_id: user.id,
                channel_id: channelId,
                created_at: Date.now(),
              },
            ]
          }
          return [
            //@ts-ignore
            ...oldData,
            {
              id: tempId,
              html,
              json_stringified: JSON.stringify(input),
              sender_id: user.id,
              channel_id: channelId,
              created_at: Date.now(),
            },
          ]
        }
      )
      // socket.emit('message', JSON.stringify(input), tempId, channelId)
    },
    [channelId, socket]
  )
  return (
    <div
      className={`
          w-full flex flex-col relative h-full bg-slate-800
    `}
    >
      <Header />
      <ChannelMessages />
      <MessageInput className="mx-3 mb-2" onSubmit={handleMessageSubmit} />
    </div>
  )
}

export default Channel
