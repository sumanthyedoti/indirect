import { useState, FC, ChangeEvent } from 'react'
import { Molecules } from '@libs/components'

import userStore from '../store/userStore'

type Message = {
  text: string
  sender_id: number
  id: number
}

const Space: FC = () => {
  const { user } = userStore()
  const [text] = useState('')
  const [messages] = useState<Message[]>([])
  const handleInput = (e: ChangeEvent<HTMLDivElement>) => {
    console.log(e.target.innerHTML)
  }
  return (
    <div
      className={`
        flex flex-col w-5/6 w-11/12 relative
        h-screen p-2 mx-auto
        lg:w-2/3 bg-slate-800
        shadow-xl shadow-slate-700/60
        `}
    >
      <span className="absolute top-0, right-0">{user?.fullname}</span>
      <div className="h-full mb-2">
        {messages.map((m) => {
          return <p key={m.id}>{m.text}</p>
        })}
      </div>
      <Molecules.MessageArea onInput={handleInput} text={text} />
    </div>
  )
}
export default Space
