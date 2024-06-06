import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IConsumer, ICreateConsumer, IUpdateConsumer } from '../models/IConsumer'
import { ConsumersDatasourceImpl } from '../services/datasource'

interface StoreState {
  consumers: IConsumer[]
  setConsumers: (consumers: IConsumer[]) => void
  getAllConsumers: () => Promise<void>
  deleteConsumer: (id: number) => Promise<void>
  createConsumer: (consumer: ICreateConsumer) => Promise<void>
  updateConsumer: (id: number, consumer: IUpdateConsumer) => Promise<void>
}

const DEFAULT_CONSUMERS: IConsumer[] = []

const STORE_NAME = 'consumers'

export const useConsumersStore = create<StoreState>(
  persist(
    (set, get) => ({
      consumers: DEFAULT_CONSUMERS,
      setConsumers: (consumers: IConsumer[]) => {
        set({ consumers })
      },
      getAllConsumers: async () => {
        const consumers = await ConsumersDatasourceImpl.getInstance().getAll()
        set({ consumers })
      },
      deleteConsumer: async (id: number) => {
        const isDeleted = await ConsumersDatasourceImpl.getInstance().delete(id)
        if (isDeleted) {
          get().getAllConsumers()
        }
      },
      createConsumer: async (consumer: ICreateConsumer) => {
        await ConsumersDatasourceImpl.getInstance().create(consumer)
      },
      updateConsumer: async (id: number, consumer: IUpdateConsumer) => {
        await ConsumersDatasourceImpl.getInstance().update(id, consumer)
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
