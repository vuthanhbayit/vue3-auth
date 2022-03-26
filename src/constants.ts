export const DEFAULT_OPTION = {
  fullPathRedirect: true,
  watchLoggedIn: true,
  redirect: {
    login: '/login',
    logout: '/login',
    home: '/',
  },
  local: {
    endpoints: {
      login: { url: '/api/auth/login', method: 'post' },
      logout: { url: '/api/auth/logout', method: 'post' },
      user: { url: '/api/auth/user', method: 'get' },
    },
    token: {
      property: 'token',
      type: 'Bearer',
      name: 'Authorization',
      prefix: '_token',
    },
    user: {
      propertyInLogin: 'user',
      propertyInFetch: '',
      propertyRole: 'role',
      propertyPermission: 'permissions',
      autoFetch: true,
    },
  },
}
