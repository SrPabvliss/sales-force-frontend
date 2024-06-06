import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ILocation, ILocationCreate, ILocationUpdate } from '../models/ILocation'
import { ProductDataSourceImpl } from '../services/datasource'

interface StoreState {
  locations: ILocation[]
  setLocations: (locations: ILocation[]) => void
  getAllLocations: () => Promise<void>
  deleteLocation: (id: number) => Promise<void>
  createLocation: (location: ILocationCreate) => Promise<void>
  updateLocation: (id: number, location: ILocationUpdate) => Promise<void>
}

const DEFAULT_LOCATIONS: ILocation[] = []

const STORE_NAME = 'locations'

export const useLocationsStore = create<StoreState>(
  persist(
    (set, get) => ({
      locations: DEFAULT_LOCATIONS,
      setLocations: (locations: ILocation[]) => {
        set({ locations })
      },
      getAllLocations: async () => {
        const locations = await ProductDataSourceImpl.getInstance().getAll()
        set({ locations })
      },
      deleteLocation: async (id: number) => {
        const isDeleted = await ProductDataSourceImpl.getInstance().delete(id)
        if (isDeleted) {
          get().getAllLocations()
        }
      },
      createLocation: async (location: ILocationCreate) => {
        await ProductDataSourceImpl.getInstance().create(location)
      },
      updateLocation: async (id: number, location: ILocationUpdate) => {
        await ProductDataSourceImpl.getInstance().update(id, location)
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
