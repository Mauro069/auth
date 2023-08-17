'use client'

import { Form } from '@/components/Form'

export const ChangePasswordForm = () => (
  <Form
    title='Cambia tu contraseña'
    description='Formulario para cambiar tu contraseña'
    onSubmit={() => console.log('change pass form submit')}
  >
    <div className='my-[10px] flex flex-col gap-4'>
      <Form.Input
        placeholder='Ingresa tu nueva contraseña...'
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
    <Form.SubmitButton buttonText='Cambiar contraseña' />
  </Form>
)
