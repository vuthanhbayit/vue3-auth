import { computed, Ref, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { $fetch } from 'ohmyfetch'
import useToken from './useToken'
import { AuthOptions } from './types'

const useUser = createSharedComposable(
  <U extends Record<string, any>>(options: AuthOptions) => {
    const { getToken, removeToken } = useToken()
    const { baseUrl, local } = options
    const { token, endpoints } = local
    const { propertyInFetch, propertyRole, propertyPermission } = local.user

    const user: Ref<U | null> = ref(null)
    const loggedIn = ref(false)

    const setUser = (data: any) => {
      user.value = data
      loggedIn.value = true
    }

    const getRole = () => {
      if (!user.value) return ''

      return user.value[propertyRole]
    }

    const isRole = (role: string) => {
      const roleUser = getRole()

      return roleUser === role
    }

    const getPermissions = () => {
      if (!user.value) return []

      return (user.value[propertyPermission] || []) as string[]
    }

    const hasPermission = (permission: string) => {
      const permissionsUser = getPermissions()

      return permissionsUser.includes(permission)
    }

    const fetchUser = async () => {
      if (!endpoints.user) return

      const url = baseUrl + endpoints.user.url

      try {
        const { data } = await $fetch(url, {
          method: endpoints.user.method,
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
      user.value = null
      loggedIn.value = false
    }

    return {
      setUser,
      getRole,
      isRole,
      getPermissions,
      hasPermission,
      fetchUser,
      resetState,
      user: computed(() => user.value),
      loggedIn: computed(() => loggedIn.value),
    }
  }
)

export default useUser
