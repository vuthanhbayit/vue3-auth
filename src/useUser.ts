import { createSharedComposable } from '@vueuse/core'
import { $fetch } from 'ohmyfetch'
import { AuthOptions } from './types'
import { reactive } from 'vue'
import useToken from './useToken'

const useUser = createSharedComposable((options: AuthOptions) => {
  const { getToken, removeToken } = useToken()
  const { baseUrl, local } = options
  const { token, endpoints } = local
  const { user } = endpoints
  const { propertyInFetch, propertyRole, propertyPermission } = local.user

  const state = reactive({
    user: null,
    loggedIn: false,
  })

  const isLoggedIn = () => state.loggedIn

  const getUser = () => state.user

  const setUser = (user: any) => {
    state.user = user
    state.loggedIn = true
  }

  const getRole = () => {
    if (!state.user) return ''

    return state.user[propertyRole]
  }

  const isRole = (role: string) => {
    const roleUser = getRole()

    return roleUser === role
  }

  const getPermissions = () => {
    if (!state.user) return []

    return (state.user[propertyPermission] || []) as string[]
  }

  const hasPermission = (permission: string) => {
    const permissionsUser = getPermissions()

    return permissionsUser.includes(permission)
  }

  const fetchUser = async () => {
    if (!user) return

    const url = baseUrl + user.url

    try {
      const { data } = await $fetch(url, {
        method: user.method,
        async onRequest({ options }) {
          options.headers = {
            [token.name]: getToken() as string,
          }
        },
      })

      const _user = propertyInFetch ? data[propertyInFetch] : data

      setUser(_user)

      return _user
    } catch (e) {
      resetState()
      removeToken()

      throw e
    }
  }

  const resetState = () => {
    state.user = null
    state.loggedIn = false
  }

  return {
    state,
    getUser,
    setUser,
    getRole,
    isRole,
    getPermissions,
    hasPermission,
    isLoggedIn,
    fetchUser,
    resetState,
  }
})

export default useUser
