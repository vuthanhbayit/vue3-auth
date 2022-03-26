import { createSharedComposable } from '@vueuse/core'
import { $fetch } from 'ohmyfetch'
import { AuthOptions } from './types'
import { reactive } from 'vue'
import useToken from './useToken'

const useUser = createSharedComposable((options: AuthOptions) => {
  const { getToken } = useToken(options)
  const state = reactive({
    user: null,
    loggedIn: false,
  })

  const getUser = () => state.user

  const setUser = (user: any) => {
    state.user = user
    state.loggedIn = true
  }

  const isLoggedIn = () => state.loggedIn

  const fetchUser = async () => {
    const { baseUrl, local } = options
    const { token, endpoints } = local
    const { user } = endpoints
    const { propertyInFetch } = local.user

    if (!user) return

    const url = baseUrl + user.url

    const { data } = await $fetch(url, {
      method: user.method,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onRequest({ options }) {
        options.headers = {
          [token.name]: getToken(),
        }
      },
    })

    const _user = propertyInFetch ? data[propertyInFetch] : data

    setUser(_user)

    return _user
  }

  const resetState = () => {
    state.user = null
    state.loggedIn = false
  }

  return { state, getUser, setUser, isLoggedIn, fetchUser, resetState }
})

export default useUser
