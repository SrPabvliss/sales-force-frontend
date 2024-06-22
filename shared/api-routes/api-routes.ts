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
    TOGGLE_ACTIVE: (id: number) => `/brands/${id}/toggle-active`,
  },
  CATEGORIES: {
    GET: '/categories',
    CREATE: '/categories',
    UPDATE: (id: number) => `/categories/${id}`,
    TOGGLE_ACTIVE: (id: number) => `/categories/${id}/toggle-active`,
  },
  PRODUCTS: {
    GET: '/products',
    CREATE: '/products',
    UPDATE: (id: number) => `/products/${id}`,
    TOGGLE_ACTIVE: (id: number) => `/products/${id}/toggle-active`,
  },
  SERVICES: {
    GET: '/services',
    CREATE: '/services',
    UPDATE: (id: number) => `/services/${id}`,
    TOGGLE_ACTIVE: (id: number) => `/services/${id}/toggle-active`,
  },
  CONSUMERS: {
    GET: '/consumers',
    CREATE: '/consumers',
    UPDATE: (id: number) => `/consumers/${id}`,
    TOGGLE_ACTIVE: (id: number) => `/consumers/${id}/toggle-active`,
  },
  LOCATIONS: {
    GET: '/locations',
    CREATE: '/locations',
    UPDATE: (id: number) => `/locations/${id}`,
    TOGGLE_ACTIVE: (id: number) => `/locations/${id}/toggle-active`,
  },
  EMPLOYEES: {
    GET: '/employees',
    CREATE: '/employees',
    UPDATE: (id: number) => `/employees/${id}`,
    TOGGLE_ACTIVE: (id: number) => `/employees/${id}/toggle-active`,
  },
  QUOTAS: {
    GET: '/quotas',
    GET_BY_EMPLOYEE: (id: number) => `/employees/${id}/quotas`,
    GET_QUOTA: (id: number) => `/quotas/${id}`,
    CREATE: '/quotas',
    UPDATE: (id: number) => `/quotas/${id}`,
    TOGGLE_ACTIVE: (id: number) => `/quotas/${id}/toggle-active`,
  },
  DELEGATIONS: {
    GET_ALL: '/delegations',
    GET_BY_ID: (id: number) => `/delegations/${id}`,
    GET_BY_EMPLOYEE: (id: number) => `/delegations/employee/${id}`,
    CREATE: '/delegations',
    UPDATE: (id: number) => `/delegations/${id}`,
    TOGGLE_ACTIVE: (id: number) => `/delegations/${id}/toggle-active`,
  },
}
