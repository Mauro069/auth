'use client'

import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useSearchParams } from 'next/navigation'
import { useLoading } from '@/hooks/useLoading'
import { AxiosRequestConfig } from 'axios'
import { Form } from '@/components/Form'

export default function ChangePasswordPage () {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const searchParams = useSearchParams()
  const authFetch = useAuthFetch()

  const changePassword = async (formData: any) => {
    startLoading()
    const token = searchParams.get('token')

    const options: AxiosRequestConfig<any> = {
      headers: {
        token
      }
    }

    await authFetch({
      endpoint: 'change-password',
      redirectRoute: '/',
      formData,
      options
    })

    finishLoading()
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
      <Form.SubmitButton
        buttonText='Cambiar contraseña'
        isLoading={isLoading}
      />
    </Form>
  )
}
