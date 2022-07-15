import { cloneElement, FC, ReactElement } from 'react'

interface FormInputProps {
  label: string
  id?: string
  field: ReactElement
  error?: string
}

const FormInput: FC<FormInputProps> = ({ label, id, field, error }) => {
  return (
    <div className="flex flex-col w-full pb-3">
      <div className="items-center">
        <label htmlFor={id} className="pb-1 text-sm">
          {label.toUpperCase()}
        </label>
        {error && <span className="self-center">&nbsp;-&nbsp;</span>}
        <em className="text-sm text-red-400">{error}</em>
      </div>
      {cloneElement(field, {
        id,
      })}
    </div>
  )
}

export default FormInput
