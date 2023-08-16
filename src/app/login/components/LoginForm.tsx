'use client'

import { Form } from '@/components/Form'

export const LoginForm = () => (
  <Form title='Login Form' onSubmit={() => console.log('login form submit')}>
    <Form.Input label='Correo' name='email' />
    <Form.Input label='Contraseña' name='password' type='password' />
    <Form.SubmitButton buttonText='Submit' />
  </Form>
)
