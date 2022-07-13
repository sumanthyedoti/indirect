import React, { useState, FC } from 'react'

interface MessageAreaProps {
  onSubmit?: (text: string) => void
}
const MessageArea: FC<MessageAreaProps> = ({ onSubmit, ...props }) => {
  const [text, setText] = useState('')
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit && onSubmit(text)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        {...props}
        onChange={handleInput}
        placeholder="Message"
        className={`
          w-full bg-slate-800 grow
          px-3 py-2
          border border-gray-600 focus:border-gray-400
          outline-none
          rounded
        `}
        value={text}
      />
    </form>
  )
}

export default MessageArea
