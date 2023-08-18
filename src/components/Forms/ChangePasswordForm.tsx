'use client'

import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useSearchParams } from 'next/navigation'
import { Form } from '@/components/Form'
import { AxiosRequestConfig } from 'axios'

export const ChangePasswordForm = () => {
  const searchParams = useSearchParams()

  const authFetch = useAuthFetch()

  const changePassword = async (formData: any) => {
    const token = searchParams.get('token')

    const options: AxiosRequestConfig<any> = {
      headers: {
        token
      }
    }

    // Agregar redirect a la Home cuando este la page
    await authFetch({
      endpoint: 'change-password',
      formData,
      options
    })
  }

  return (
    <Form
      title='Cambia tu contraseña'
      description='Formulario para cambiar tu contraseña'
      onSubmit={changePassword}
    >
      <div className='my-[10px] flex flex-col gap-4'>
        <Form.Input
          placeholder='Ingresa tu nueva contraseña...'
          label='Contraseña'
          name='newPassword'
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
}
