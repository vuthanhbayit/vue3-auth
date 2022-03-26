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
  prefix: string
}

export interface User {
  propertyInLogin: string
  propertyInFetch: string
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
