import { useCookies } from '@vueuse/integrations/useCookies'
import { AuthOptions } from './types'

const useToken = (options: AuthOptions) => {
  const { token } = options.local
  const key = `auth.${token.prefix}.local`
  const cookies = useCookies()

  const getToken = () => cookies.get(key)
  const setToken = (tokenValue: string) => {
    const parseToken = `${token.type} ${tokenValue}`

    cookies.set(key, parseToken)
  }
  const removeToken = () => cookies.remove(key)

  return { getToken, setToken, removeToken }
}

export default useToken
