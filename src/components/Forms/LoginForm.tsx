'use client'

import { useAuthFetch } from '@/hooks/useAuthFetch'
import { Form } from '@/components/Form'

export const LoginForm = () => {
  const authFetch = useAuthFetch()

  const login = async (formData: any) => {
    // Agregar redirect a la Home cuando este la page
    await authFetch({ endpoint: 'login', formData })
  }

  return (
    <Form
      title='Inicia Sesión'
      description='Formulario para iniciar sesión'
      onSubmit={login}
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
      </div>
      <Form.SubmitButton buttonText='Iniciar Sesión' />
    </Form>
  )
}
