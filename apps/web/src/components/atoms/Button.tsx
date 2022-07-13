import { FC } from 'react'

interface props {
  label: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<props> = ({ label, type = 'button', onClick }) => {
  return (
    <button
      type={type}
      className={`px-6 py-3 text-zinc-100 text-lg
                  bg-blue-600 rounded
                  outline-none font-semibold
                  ring-slate-100 ring-offset-1 focus:ring-2`}
      onClick={onClick}
    >
      {label}!
    </button>
  )
}

export default Button
