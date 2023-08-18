'use client'

import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'
import { Form } from '@/components/Form'

export default function ForgetPasswordPage () {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const authFetch = useAuthFetch()

  const forgetPassword = async (formData: any) => {
    startLoading()
    await authFetch({ endpoint: 'forget-password', formData })
    finishLoading()
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
      <Form.SubmitButton
        buttonText='Recuperar contraseña'
        isLoading={isLoading}
      />
      <Form.Footer description='Volver al' textLink='Inicio' link='/' />
    </Form>
  )
}
