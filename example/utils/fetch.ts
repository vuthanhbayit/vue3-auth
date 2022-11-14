import { createFetch } from '@thinkvn/fetch'

const TIMEOUT_MILLISECONDS = 10 * 1000 // 10s

const fetch = createFetch({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: TIMEOUT_MILLISECONDS,
  debugError: true,
})

export { fetch }
