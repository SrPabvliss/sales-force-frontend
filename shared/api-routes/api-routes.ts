export const API_ROUTES = {
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
}
