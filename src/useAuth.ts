import { getCurrentInstance } from 'vue'
import useToken from './useToken'
import useUser from './useUser'
import useProviderLocal from './useProviderLocal'
import type { AuthOptions } from './types'

const useAuth = <U extends object>(_options?: AuthOptions) => {
  const instance = getCurrentInstance()

  const options: AuthOptions =
    _options || instance?.appContext.config.globalProperties.authOptions

  const {
    user,
    loggedIn,
    setUser,
    fetchUser,
    getRole,
    isRole,
    getPermissions,
    hasPermission,
    resetState,
  } = useUser<U>(options)
  const { setToken, getToken, removeToken } = useToken()
  const { login, logout } = useProviderLocal(options)

  return {
    login,
    logout,
    setToken,
    getToken,
    removeToken,
    user,
    loggedIn,
    setUser,
    getRole,
    isRole,
    getPermissions,
    hasPermission,
    resetState,
    fetchUser,
  }
}

export default useAuth
