'use client'

import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'
import { Form } from '@/components/Form'

export default function RegisterPage () {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const authFetch = useAuthFetch()

  const register = async (formData: any) => {
    startLoading()
    await authFetch({ endpoint: 'register', formData, redirectRoute: '/home' })
    finishLoading()
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
      <Form.SubmitButton buttonText='Crear cuenta' isLoading={isLoading} />
      <Form.Footer
        description='Ya tienes cuenta?'
        textLink='Inicia Sesión'
        link='/'
      />
    </Form>
  )
}
