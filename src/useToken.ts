import Cookies from 'js-cookie'
import { AuthOptions } from './types'

const useToken = (options: AuthOptions) => {
  const { token } = options.local
  const key = `auth.${token.prefix}.local`

  const getToken = () => Cookies.get(key)
  const setToken = (tokenValue: string) => Cookies.set(key, `${token.type} ${tokenValue}`)
  const removeToken = () => Cookies.remove(key)

  return { getToken, setToken, removeToken }
}

export default useToken
