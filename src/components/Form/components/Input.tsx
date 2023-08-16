'use client'

import { useContext } from 'react'
import { FormContext } from '..'

interface InputProps {
  type?: 'text' | 'password'
  name: string
  label: string
}

export function Input ({ name, label, type = 'text' }: InputProps) {
  const { formValues, setFormValues } = useContext(FormContext)!

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formValues[name] || ''}
        onChange={handleChange}
      />
    </div>
  )
}
