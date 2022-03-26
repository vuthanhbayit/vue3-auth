import { getCurrentInstance, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { $fetch } from 'ohmyfetch'
import useToken from './useToken'
import useUser from './useUser'
import type { AuthOptions } from './types'

const useAuth = (_options?: AuthOptions) => {
  const router = useRouter()
  const route = useRoute()
  const instance = getCurrentInstance()

  const options: AuthOptions =
    _options || instance?.appContext.config.globalProperties.authOptions

  const { baseUrl, redirect, watchLoggedIn } = options
  const { endpoints, token, user } = options.local

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
  const { setToken, getToken, removeToken } = useToken(options)

  const redirectAfterLogin = () => {
    const path = (route.query.redirect || redirect.home) as string

    router.replace(path)
  }

  const redirectAfterLogout = () => {
    const isNeedRedirect = route.meta.auth

    if (isNeedRedirect) {
      const path = redirect.logout || redirect.home

      router.replace(path)
    }
  }

  const login = async (args: any) => {
    if (!endpoints.login) {
      return
    }

    const url = baseUrl + endpoints.login.url
    const { data } = await $fetch(url, {
      method: endpoints.login.method,
      body: args,
    })

    const _token = data[token.property]
    const _user = data[user.propertyInLogin]

    _token && setToken(_token)

    if (_user) {
      setUser(_user)
    } else {
      await fetchUser()
    }

    redirectAfterLogin()
  }

  const logout = async (args?: any) => {
    removeToken()
    resetState()

    if (watchLoggedIn) {
      redirectAfterLogout()
    }

    if (!endpoints.logout) {
      return
    }

    const url = baseUrl + endpoints.logout.url
    const { data } = await $fetch(url, {
      method: endpoints.logout.method,
      body: args,
    })

    return data
  }

  return {
    login,
    logout,
    setToken,
    getToken,
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
