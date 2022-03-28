import { $fetch } from 'ohmyfetch'
import { useRoute, useRouter } from 'vue-router'
import { AuthOptions } from './types'
import useToken from './useToken'
import useUser from './useUser'

const useProviderLocal = (options: AuthOptions) => {
  const router = useRouter()
  const route = useRoute()
  const { setToken, removeToken } = useToken(options)
  const { setUser, fetchUser, resetState } = useUser(options)

  const { baseUrl, redirect, watchLoggedIn } = options
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

  return { login, logout }
}

export default useProviderLocal
