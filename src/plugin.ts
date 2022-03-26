import defu from 'defu'
import useToken from './useToken'
import useUser from './useUser'
import { DEFAULT_OPTION } from './contants'
import type { App, Plugin } from 'vue'
import type { AuthOptions } from './types'

const createAuth = (app: App, _options: AuthOptions) => {
  const options = defu(_options, DEFAULT_OPTION)

  app.config.globalProperties.authOptions = options

  const { router, redirect, fullPathRedirect, local } = options
  const { getToken } = useToken(options)
  const { isLoggedIn, fetchUser } = useUser(options)

  router.beforeEach(async (to, from, next) => {
    const token = getToken()
    const loggedIn = isLoggedIn()

    if (token) {
      if (to.path === redirect.login) {
        next({ path: redirect.home })
      } else {
        if (loggedIn) {
          next()
        } else {
          if (local.user.autoFetch) {
            await fetchUser()
          }

          next()
        }
      }
    } else {
      const isAuthMeta = Boolean(to.meta.auth)
      const isPageGuest = redirect.login === to.path || !isAuthMeta

      if (isPageGuest) {
        next()
      } else {
        const redirectPath = fullPathRedirect ? to.fullPath : to.path

        next(`${redirect.login}?redirect=${redirectPath}`)
      }
    }
  })
}

const authPlugin: Plugin = {
  install: createAuth,
}

export default authPlugin
