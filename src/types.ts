import { Router } from 'vue-router'

export interface Redirect {
  login: string
  logout: string
  home: string
}

export interface Endpoint {
  url: string
  method: string
}

export interface Token {
  property: string
  type: string
  name: string
}

export interface User {
  propertyInLogin: string
  propertyInFetch: string
  propertyRole: string
  propertyPermission: string
  autoFetch: boolean
}

export type EndpointKey = 'login' | 'logout' | 'user'

export interface AuthOptions {
  router: Router
  fullPathRedirect: boolean
  watchLoggedIn: boolean
  baseUrl: string
  redirect: Redirect
  local: {
    endpoints: Record<EndpointKey, Endpoint | false>
    token: Token
    user: User
  }
}

export type MetaAuth =
  | boolean
  | {
      role: string
      permission: string
    }
