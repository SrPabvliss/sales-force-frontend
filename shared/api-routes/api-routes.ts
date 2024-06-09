export const ACCESS_TOKEN_COOKIE_NAME = 'access_token'

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GET_ACCESS_MODULES: (id: number) => `/employees/${id}/permissions`,
  },
  BRANDS: {
    GET: '/brands',
    CREATE: '/brands',
    UPDATE: (id: number) => `/brands/${id}`,
    DELETE: (id: number) => `/brands/${id}`,
  },
  CATEGORIES: {
    GET: '/categories',
    CREATE: '/categories',
    UPDATE: (id: number) => `/categories/${id}`,
    DELETE: (id: number) => `/categories/${id}`,
  },
  PRODUCTS: {
    GET: '/products',
    CREATE: '/products',
    UPDATE: (id: number) => `/products/${id}`,
    DELETE: (id: number) => `/products/${id}`,
  },
  CONSUMERS: {
    GET: '/consumers',
    CREATE: '/consumers',
    UPDATE: (id: number) => `/consumers/${id}`,
    DELETE: (id: number) => `/consumers/${id}`,
  },
  LOCATIONS: {
    GET: '/locations',
    CREATE: '/locations',
    UPDATE: (id: number) => `/locations/${id}`,
    DELETE: (id: number) => `/locations/${id}`,
  },
  CONSUMERS: {
    GET: '/consumers',
    CREATE: '/consumers',
    UPDATE: (id: number) => `/consumers/${id}`,
    DELETE: (id: number) => `/consumers/${id}`,
  },
}
