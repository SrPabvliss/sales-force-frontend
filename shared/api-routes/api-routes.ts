export const API_ROUTES = {
  BRANDS: {
    GET: '/brands',
    POST: '/brands',
    PUT: '/brands/:id',
    DELETE: (id: number) => `/brands/${id}`,
  },
}
