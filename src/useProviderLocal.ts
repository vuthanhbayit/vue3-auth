import { useRoute, useRouter } from 'vue-router'
import { AuthOptions } from './types'
import useToken from './useToken'
import useUser from './useUser'
import { get } from './utils'

const useProviderLocal = (options: AuthOptions) => {
  const router = useRouter()
  const route = useRoute()
  const { setToken, removeToken } = useToken()
  const { setUser, fetchUser, resetState } = useUser(options)

  const { redirect, watchLoggedIn } = options
  const { endpoints, token, user } = options.local

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

    const { data } = await options.fetch(endpoints.login.url, {
      method: endpoints.login.method,
      params: args,
    })

    const _token = get(data, token.property)
    const _user = get(data, user.propertyInLogin)

    if (_token) {
      setToken(token.type ? token.type + ' ' + _token : _token)
    }

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

    const { data } = await options.fetch(endpoints.logout.url, {
      method: endpoints.logout.method,
      params: args,
    })

    return data
  }

  return { login, logout }
}

export default useProviderLocal
