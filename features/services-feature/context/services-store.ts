import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ICreateService, IService, IUpdateService } from '../models/IService'
import { ServicesDataSourceImpl } from '../services/datasource'

interface StoreState {
  services: IService[]
  setServices: (services: IService[]) => void
  getAllServices: () => Promise<void>
  deleteService: (id: number) => Promise<void>
  createService: (service: ICreateService) => Promise<void>
  updateService: (id: number, service: IUpdateService) => Promise<void>
}

const DEFAULT_SERVICES: IService[] = []

const STORE_NAME = 'services'

export const useServicesStore = create<StoreState>(
  persist(
    (set, get) => ({
      services: DEFAULT_SERVICES,
      setServices: (services: IService[]) => {
        set({ services })
      },
      getAllServices: async () => {
        const services = await ServicesDataSourceImpl.getInstance().getAll()
        set({ services })
      },
      deleteService: async (id: number) => {
        const isDeleted = await ServicesDataSourceImpl.getInstance().delete(id)
        if (isDeleted) {
          get().getAllServices()
        }
      },
      createService: async (service: ICreateService) => {
        await ServicesDataSourceImpl.getInstance().create(service)
      },
      updateService: async (id: number, service: IUpdateService) => {
        await ServicesDataSourceImpl.getInstance().update(id, service)
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
