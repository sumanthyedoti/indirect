import { useState, FC, ChangeEvent } from 'react'

interface MessageAreaProps {
  text: string
  onInput?: (e: ChangeEvent<HTMLDivElement>) => void
}
const MessageArea: FC<MessageAreaProps> = ({
  text = '',
  onInput,
  ...props
}) => {
  const [count] = useState(0)
  console.log(count)

  return (
    <div
      {...props}
      contentEditable={true}
      onInput={onInput}
      data-placeholder="Message"
      className={`
        bg-slate-800
        grow
        px-3 py-2
        border border-gray-600 focus:border-gray-400
        outline-none
        rounded
      `}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

export default MessageArea
