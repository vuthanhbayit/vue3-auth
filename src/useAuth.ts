import { getCurrentInstance, toRefs } from 'vue'
import useToken from './useToken'
import useUser from './useUser'
import useProviderLocal from './useProviderLocal'
import type { AuthOptions } from './types'

const useAuth = (_options?: AuthOptions) => {
  const instance = getCurrentInstance()

  const options: AuthOptions =
    _options || instance?.appContext.config.globalProperties.authOptions

  const {
    state,
    getUser,
    setUser,
    fetchUser,
    getRole,
    isRole,
    getPermissions,
    hasPermission,
    resetState,
  } = useUser(options)
  const { setToken, getToken, removeToken } = useToken()
  const { login, logout } = useProviderLocal(options)

  return {
    login,
    logout,
    setToken,
    getToken,
    removeToken,
    getUser,
    setUser,
    getRole,
    isRole,
    getPermissions,
    hasPermission,
    resetState,
    fetchUser,
    ...toRefs(state),
  }
}

export default useAuth
