'use client'

import { useAuthFetch } from '@/hooks/useAuthFetch'
import { Form } from '@/components/Form'

export const RegisterForm = () => {
  const authFetch = useAuthFetch()

  const register = async (formData: any) => {
    await authFetch({ endpoint: 'register', formData, redirectRoute: '/' })
  }

  return (
    <Form
      title='Registrate'
      description='Formulario para crear una cuenta'
      onSubmit={register}
    >
      <div className='my-[10px] flex flex-col gap-4'>
        <Form.Input
          placeholder='Ingresa tu correo...'
          label='Correo'
          name='email'
        />
        <Form.Input
          placeholder='Ingresa tu contraseña...'
          label='Contraseña'
          name='password'
          type='password'
        />
        <Form.Input
          placeholder='Repite tu contraseña...'
          label='Confirmar contraseña'
          name='confirmPassword'
          type='password'
        />
      </div>
      <Form.SubmitButton buttonText='Crear cuenta' />
    </Form>
  )
}
