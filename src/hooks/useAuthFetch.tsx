import NotificationContext from '@/context/NotificationContext'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import axios from 'axios'

interface AuthFetchProps {
  endpoint: string
  redirectRoute?: string
  formData: any
}

export function useAuthFetch () {
  const { showNotification } = useContext(NotificationContext)
  const router = useRouter()

  const authFetch = async ({
    endpoint,
    redirectRoute,
    formData
  }: AuthFetchProps) => {
    try {
      const { data } = await axios.post(`/api/auth/${endpoint}`, formData)

      showNotification({
        msj: data.message,
        status: 'success',
        open: true
      })

      if (redirectRoute) router.push(redirectRoute)
    } catch (error: any) {
      showNotification({
        msj: error.response.data.message as string,
        status: 'error',
        open: true
      })
    }
  }

  return authFetch
}
