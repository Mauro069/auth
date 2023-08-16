'use client'

import React, { useState, createContext } from 'react'
import { Input, SubmitButton } from './components'

type FormValues = Record<string, string>

interface FormContextType {
  formValues: FormValues
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
}

export const FormContext = createContext<FormContextType | undefined>(undefined)

interface FormProps {
  title: string
  onSubmit: (values: FormValues) => void
  children: React.ReactNode
}

export function Form ({ title, onSubmit, children }: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({})

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(formValues)
  }

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <form
        className='py-4 bg-slate-400 flex flex-col gap-[1rem] max-w-md items-center'
        onSubmit={handleSubmit}
      >
        <h2>{title}</h2>
        {children}
      </form>
    </FormContext.Provider>
  )
}

Form.Input = Input
Form.SubmitButton = SubmitButton
