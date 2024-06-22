import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ICreateDelegation, IDelegation, IUpdateDelegation } from '../models/IDelegation'
import { DelegationsDatasourceImpl } from '../services/datasource'

interface StoreState {
  delegations: IDelegation[]
  setDelegations: (delegations: IDelegation[]) => void
  getAllDelegations: () => Promise<void>
  getAllDelegationsByEmployee: (id: number) => IDelegation[]
  getDelegationById: (id: number) => Promise<void>
  createDelegation: (delegation: ICreateDelegation) => Promise<void>
  updateDelegation: (id: number, delegation: IUpdateDelegation) => Promise<void>
  toggleActive: (id: number) => Promise<void>
}

const DEFAULT_DELEGATIONS: IDelegation[] = []

const STORE_NAME = 'delegations'

export const useDelegationsStore = create<StoreState>(
  persist(
    (set, get) => ({
      delegations: DEFAULT_DELEGATIONS,
      setDelegations: (delegations: IDelegation[]) => {
        set({ delegations })
      },
      getAllDelegations: async () => {
        const delegations = await DelegationsDatasourceImpl.getInstance().getAll()
        set({ delegations })
      },
      getAllDelegationsByEmployee: (id: number) => {
        const { delegations } = get()
        return delegations.filter((delegation) => delegation.employee.id === id)
      },
      getDelegationById: async (id: number) => {
        await DelegationsDatasourceImpl.getInstance().getById(id)
      },
      createDelegation: async (delegation: ICreateDelegation) => {
        await DelegationsDatasourceImpl.getInstance().create(delegation)
      },
      updateDelegation: async (id: number, delegation: IUpdateDelegation) => {
        await DelegationsDatasourceImpl.getInstance().update(id, delegation)
      },
      toggleActive: async (id: number) => {
        await DelegationsDatasourceImpl.getInstance().toggleActive(id)
        get().getAllDelegations()
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
