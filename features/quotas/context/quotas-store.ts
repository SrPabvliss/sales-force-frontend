import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IQuota, ICreateQuota, IUpdateQuota } from '../models/IQuota'
import { QuotaDataSourceImpl } from '../services/datasource'

interface StoreState {
  quotas: IQuota[]
  setQuotas: (quotas: IQuota[]) => void
  getAllQuotas: () => Promise<void>
  getQuotaByEmployee: (id: number) => Promise<void>
  getQuota: (id: number) => Promise<void>
  createQuota: (quota: ICreateQuota) => Promise<void>
  updateQuota: (id: number, quota: IUpdateQuota) => Promise<void>
  toggleActive: (id: number) => Promise<void>
}

const DEFAULT_QUOTAS: IQuota[] = []

const STORE_NAME = 'quotas'

export const useQuotasStore = create<StoreState>(
  persist(
    (set, get) => ({
      quotas: DEFAULT_QUOTAS,
      setQuotas: (quotas: IQuota[]) => {
        set({ quotas })
      },
      getAllQuotas: async () => {
        const quotas = await QuotaDataSourceImpl.getInstance().getAll()
        set({ quotas })
      },
      getQuotaByEmployee: async (id: number) => {
        const quotas = await QuotaDataSourceImpl.getInstance().getByEmployee(id)
        set({ quotas })
      },
      getQuota: async (id: number) => {
        const quota = await QuotaDataSourceImpl.getInstance().getQuota(id)
        set({ quotas: [quota] })
      },
      createQuota: async (quota: ICreateQuota) => {
        await QuotaDataSourceImpl.getInstance().create(quota)
      },
      updateQuota: async (id: number, quota: IUpdateQuota) => {
        await QuotaDataSourceImpl.getInstance().update(id, quota)
      },
      toggleActive: async (id: number) => {
        const toogled = await QuotaDataSourceImpl.getInstance().toogleActive(id)
        if (toogled) {
          get().getAllQuotas()
        }
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
