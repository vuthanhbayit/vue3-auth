import defu from 'defu'
import { isObject } from '@thinkvn/utils'
import useToken from './useToken'
import useUser from './useUser'
import { DEFAULT_OPTION } from './constants'
import type { App, Plugin } from 'vue'
import type { AuthOptions, MetaAuth } from './types'

declare module 'vue' {
  interface ComponentCustomProperties {
    $hasPermission: (permission: string) => boolean
    $hasPermissions: (permissions: string[]) => boolean
    $isRole: (role: string) => boolean
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $hasPermission: (permission: string) => boolean
    $hasPermissions: (permissions: string[]) => boolean
    $isRole: (role: string) => boolean
  }
}

const createAuth = (app: App, _options: AuthOptions) => {
  const options = defu(_options, DEFAULT_OPTION) as AuthOptions

  app.config.globalProperties.authOptions = options

  const { router, fetch, redirect, fullPathRedirect, local } = options
  const { getToken } = useToken()
  const { loggedIn, fetchUser, isRole, hasPermission, hasPermissions } =
    useUser(options)

  // define permission and role injection
  app.config.globalProperties.$hasPermission = hasPermission
  app.config.globalProperties.$hasPermissions = hasPermissions
  app.config.globalProperties.$isRole = isRole

  fetch.interceptors.request.use(config => {
    if (!config) return

    const token = getToken()

    if (token) {
      config.headers[DEFAULT_OPTION.local.token.name] = token
    }

    return config
  })

  router.beforeEach(async (to, from, next) => {
    const token = getToken()
    const { auth: metaAuth } = to.meta

    const isValidateAuthenticatedNextPage = (metaAuth: MetaAuth) => {
      let isAuthenticated = false

      if (metaAuth === true && loggedIn.value) {
        isAuthenticated = true
      }

      if (isObject(metaAuth)) {
        if (metaAuth.hasOwnProperty('role')) {
          isAuthenticated = isRole(metaAuth.role)
        }

        if (metaAuth.hasOwnProperty('permission')) {
          isAuthenticated = hasPermission(metaAuth.permission)
        }
      }

      return isAuthenticated
    }

    const redirectToLoginPage = () => {
      const redirectPath = fullPathRedirect ? to.fullPath : to.path

      next(`${redirect.login}?redirect=${redirectPath}`)
    }

    if (token) {
      if (to.path === redirect.login) {
        return next({ path: redirect.home })
      }

      if (!loggedIn.value && local.user.autoFetch) {
        try {
          await fetchUser()
        } catch {
          redirectToLoginPage()
        }
      }

      if (!metaAuth || isValidateAuthenticatedNextPage(metaAuth as MetaAuth)) {
        return next()
      }

      return next(`${redirect.home}`)
    }

    if (
      redirect.login === to.path ||
      !metaAuth ||
      isValidateAuthenticatedNextPage(metaAuth as MetaAuth)
    ) {
      return next()
    }

    return redirectToLoginPage()
  })
}

const authPlugin: Plugin = {
  install: createAuth,
}

export default authPlugin
