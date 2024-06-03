// store, redux, zustand, manejadores de estado

// create -> Datasource.create()

import { SUBMODULES } from '@/shared/constants/submodules'
import { IModule } from '@/shared/interfaces/IModule'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IUser } from '../models/IUser'

interface StoreState {
  user: IUser | undefined
  setUser: (user?: IUser) => void
  getSubmodules: (modules: number[]) => IModule[]
  // retreiveFromCookie: () => Promise<boolean>
}

const DEFAULT_USER: IUser = {
  id: 0,
  firstLastName: 'Villacres',
  firstName: 'Pablo',
  role: 'ADMIN',
  accessModules: [1, 2, 3],
}

const STORE_NAME = 'user'

export const UseAccountStore = create<StoreState>(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      setUser: (user?: IUser | undefined) => {
        if (!user) {
          set({ user: undefined })
          return
        }
        // aqui maneejo la lógica
        set({ user })
      },
      getSubmodules: (modules: number[]) => {
        return modules.map((module) => SUBMODULES[module as keyof typeof SUBMODULES])
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
