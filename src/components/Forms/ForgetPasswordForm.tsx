'use client'

import { Form } from '@/components/Form'

export const ForgetPasswordForm = () => (
  <Form
    title='Recuperar contraseña'
    description='Formulario para recuperar tu contraseña'
    onSubmit={() => console.log('forget pass form submit')}
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
