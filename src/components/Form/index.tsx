'use client'

import React, { useState, createContext } from 'react'
import { Input, SubmitButton } from './components'
import { Footer } from './components/Footer'
import styles from './styles.module.scss'

type FormValues = Record<string, string>

interface FormContextType {
  formValues: FormValues
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
}

export const FormContext = createContext<FormContextType | undefined>(undefined)

interface FormProps {
  title: string
  description?: string
  onSubmit: (values: FormValues) => void
  children: React.ReactNode
}

export function Form ({ title, description, onSubmit, children }: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({})

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(formValues)
  }

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.descriptionContainer}>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {children}
      </form>
    </FormContext.Provider>
  )
}

Form.Input = Input
Form.SubmitButton = SubmitButton
Form.Footer = Footer
