'use client'

import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'
import { Form } from '@/components/Form'

export default function LoginPage () {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const authFetch = useAuthFetch()

  const login = async (formData: any) => {
    startLoading()
    await authFetch({ endpoint: 'login', redirectRoute: '/home', formData })
    finishLoading()
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
      <Form.SubmitButton buttonText='Iniciar Sesión' isLoading={isLoading} />
      <Form.Footer
        description='Te olvidaste tu contraseña?'
        textLink='Recuperar contraseña'
        link='/forget-password'
      />
      <Form.Footer
        description='Aun no tienes cuenta?'
        textLink='Registrate'
        link='/register'
      />
    </Form>
  )
}
