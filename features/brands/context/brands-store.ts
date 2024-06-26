import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IBrand, ICreateBrand, IUpdateBrand } from '../models/IBrands'
import { BrandsDatasourceImpl } from '../services/Datasource'

interface StoreState {
  brands: IBrand[]
  setBrands: (brands: IBrand[]) => void
  getAllBrands: () => Promise<void>
  deleteBrand: (id: number) => Promise<void>
  createBrand: (brand: ICreateBrand) => Promise<void>
  updateBrand: (id: number, brand: IUpdateBrand) => Promise<void>
}

const DEFAULT_BRANDS: IBrand[] = []

const STORE_NAME = 'brands'

export const useBrandsStore = create<StoreState>(
  persist(
    (set, get) => ({
      brands: DEFAULT_BRANDS,
      setBrands: (brands: IBrand[]) => {
        set({ brands })
      },
      getAllBrands: async () => {
        const brands = await BrandsDatasourceImpl.getInstance().getAll()
        set({ brands })
      },
      deleteBrand: async (id: number) => {
        const isDeleted = await BrandsDatasourceImpl.getInstance().delete(id)
        if (isDeleted) {
          get().getAllBrands()
        }
      },
      createBrand: async (brand: ICreateBrand) => {
        await BrandsDatasourceImpl.getInstance().create(brand)
      },
      updateBrand: async (id: number, brand: IUpdateBrand) => {
        await BrandsDatasourceImpl.getInstance().update(id, brand)
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
