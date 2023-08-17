'use client'

import { Form } from '@/components/Form'

export const LoginForm = () => (
  <Form
    title='Inicia Sesión'
    description='Formulario para iniciar sesión'
    onSubmit={() => console.log('login form submit')}
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
