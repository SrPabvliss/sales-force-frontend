import { deleteCookie } from '@/core/utils/CookiesUtil'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/shared/api-routes/api-routes'
import { MODULES } from '@/shared/constants/submodules'
import { IModule } from '@/shared/interfaces/IModule'
import toast from 'react-hot-toast'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IAuth, IUser } from '../models/IUser'
import { UserDatasourceImpl } from '../services/Datasource'

interface StoreState {
  user: IUser | undefined
  accessModules: number[]
  setAccessModules: (modules: number[]) => void
  getAccessModules: (id: number) => void
  login: (credentials: IAuth) => void
  setUser: (user?: IUser) => void
  getSubmodules: (modules: number[]) => IModule[]
  logout: () => void
}

export const DEFAULT_USER: IUser | undefined = undefined

const DEFAULT_MODULES: number[] = []

const STORE_NAME = 'user'

export const UseAccountStore = create<StoreState>(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      accessModules: DEFAULT_MODULES,
      setAccessModules: (modules) => set({ accessModules: modules }),
      getAccessModules: async (id) => {
        const modules = await UserDatasourceImpl.getInstance().getAccessModules(id)
        set({ accessModules: modules })
      },
      login: async (credentials) => {
        const user = await UserDatasourceImpl.getInstance().login(credentials)
        get().getAccessModules(user.id)
        if (!user || !user.id || !get().accessModules) {
          toast.error('Algo salió mal, por favor intente nuevamente.')
          return
        }
        toast.success(`Bienvenido ${user.person.name}!`)
        set({ user })
      },
      getSubmodules: (modules) => {
        return modules.map((module) => MODULES[module as keyof typeof MODULES])
      },
      setUser: (user?: IUser | undefined) => {
        if (!user) {
          set({ user: undefined })
          return
        }
        set({ user })
      },
      logout: async () => {
        await deleteCookie(ACCESS_TOKEN_COOKIE_NAME)
        toast.success(`Hasta luego ${get().user?.person.name}!`)
        set({ user: DEFAULT_USER, accessModules: DEFAULT_MODULES })
      },
      // retreiveFromCookie: async () => {
      //   const userToken = await getCookie(ACCESS_TOKEN_COOKIE_NAME)

      //   if (!userToken) return false

      //   const userData: IUserPayload = jwtDecode(userToken)
      //   const { sub, ...userWithoutSub } = userData

      //   set({ user: { ...userWithoutSub, id: sub, sub } })
      //   return true
      // },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
