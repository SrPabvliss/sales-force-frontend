import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ChanceStatus, IChance, ICreateChance } from '../models/IChance'
import { ChancesDatasourceImpl } from '../services/datasource'

interface StoreState {
  chances: IChance[]
  setChances: (chances: IChance[]) => void
  getAllChances: () => Promise<void>
  getChanceById: (id: number) => Promise<void>
  createChance: (delegation: ICreateChance) => Promise<void>
  toggleStatus: (id: number, status: ChanceStatus | null) => Promise<void>
  deleteChance: (id: number) => Promise<void>
}

const DEFAULT_DELEGATIONS: IChance[] = []

const STORE_NAME = 'chances'

export const useChancesStore = create<StoreState>(
  persist(
    (set, get) => ({
      chances: DEFAULT_DELEGATIONS,
      setChances: (chances: IChance[]) => {
        set({ chances })
      },
      getAllChances: async () => {
        const chances = await ChancesDatasourceImpl.getInstance().getAll()
        set({ chances })
      },
      getChanceById: async (id: number) => {
        const chance = await ChancesDatasourceImpl.getInstance().getById(id)
        set({ chances: [...get().chances, chance] })
      },
      createChance: async (chance: ICreateChance) => {
        await ChancesDatasourceImpl.getInstance().create(chance)
      },
      toggleStatus: async (id: number, status: ChanceStatus | null) => {
        const result = await ChancesDatasourceImpl.getInstance().updateStatus(id, status)
        if (result) {
          get().getAllChances()
        }
      },
      deleteChance: async (id: number) => {
        const result = await ChancesDatasourceImpl.getInstance().delete(id)
        if (result) {
          get().getAllChances()
        }
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
