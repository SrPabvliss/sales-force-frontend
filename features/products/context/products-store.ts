import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IProduct, IProductCreate, IProductUpdate } from '../models/IProduct'
import { ProductsDatasourceImpl } from '../services/datasource'

interface StoreState {
  products: IProduct[]
  setProducts: (products: IProduct[]) => void
  getAllProducts: () => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  createProduct: (product: IProductCreate) => Promise<void>
  updateProduct: (id: number, product: IProductUpdate) => Promise<void>
}

const DEFAULT_PRODUCTS: IProduct[] = []

const STORE_NAME = 'products'

export const useProductsStore = create<StoreState>(
  persist(
    (set, get) => ({
      products: DEFAULT_PRODUCTS,
      setProducts: (products: IProduct[]) => {
        set({ products })
      },
      getAllProducts: async () => {
        const products = await ProductsDatasourceImpl.getInstance().getAll()
        set({ products })
      },
      deleteProduct: async (id: number) => {
        const isDeleted = await ProductsDatasourceImpl.getInstance().delete(id)
        if (isDeleted) {
          get().getAllProducts()
        }
      },
      createProduct: async (product: IProductCreate) => {
        await ProductsDatasourceImpl.getInstance().create(product)
      },
      updateProduct: async (id: number, product: IProductUpdate) => {
        await ProductsDatasourceImpl.getInstance().update(id, product)
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
