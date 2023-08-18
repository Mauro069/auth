'use client'

import { useAuthFetch } from '@/hooks/useAuthFetch'
import { Form } from '@/components/Form'

export const ForgetPasswordForm = () => {
  const authFetch = useAuthFetch()

  const forgetPassword = async (formData: any) => {
    // Agregar redirect a la Home cuando este la page
    await authFetch({ endpoint: 'forget-password', formData })
  }

  return (
    <Form
      title='Recuperar contraseña'
      description='Formulario para recuperar tu contraseña'
      onSubmit={forgetPassword}
    >
      <div className='my-[10px] flex flex-col gap-4'>
        <Form.Input
          placeholder='Ingresa tu correo...'
          label='Correo'
          name='email'
        />
      </div>
      <Form.SubmitButton buttonText='Recuperar contraseña' />
    </Form>
  )
}
