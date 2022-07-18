import Cookies from 'js-cookie'

const useToken = () => {
  const key = `auth.local`

  const getToken = () => Cookies.get(key)
  const setToken = (tokenValue: string) => Cookies.set(key, `Bearer ${tokenValue}`)
  const removeToken = () => Cookies.remove(key)

  return { key, getToken, setToken, removeToken }
}

export default useToken
