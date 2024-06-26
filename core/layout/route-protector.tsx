'use client'
import { useRouter } from 'next/navigation'

import { createContext, useContext, ReactNode } from 'react'

type AppRouterInstance = ReturnType<typeof useRouter>

const RouterContext = createContext<AppRouterInstance | null>(null)

interface RouterProviderProps {
  children: ReactNode
}

export const RouterProvider = ({ children }: RouterProviderProps) => {
  const router = useRouter()
  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
}

export const useAppRouter = () => {
  return useContext(RouterContext)
}
