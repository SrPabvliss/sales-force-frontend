export const API_ROUTES = {
  BRANDS: {
    GET: '/brands',
    CREATE: '/brands',
    UPDATE: (id: number) => `/brands/${id}`,
    DELETE: (id: number) => `/brands/${id}`,
  },
}
