import { computed, Ref, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { get } from '@thinkvn/utils'
import useToken from './useToken'
import { AuthOptions } from './types'

const useUser = createSharedComposable(
  <U extends Record<string, any>>(options: AuthOptions) => {
    const { removeToken } = useToken()
    const { local } = options
    const { endpoints } = local
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

    const hasPermissions = (permissions: string[]) => {
      return permissions.every(hasPermission)
    }

    const fetchUser = async () => {
      if (!endpoints.user) return

      try {
        const { data } = await options.fetch(endpoints.user.url, {
          method: endpoints.user.method,
        })

        const _user = propertyInFetch ? get(data, propertyInFetch) : data

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
      hasPermissions,
      fetchUser,
      resetState,
      user: computed(() => user.value),
      loggedIn: computed(() => loggedIn.value),
    }
  }
)

export default useUser
