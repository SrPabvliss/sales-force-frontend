import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ICategory, ICreateCategory, IUpdateCategory } from '../models/ICategory'
import { CategoriesDatasourceImpl } from '../services/datasource'

interface StoreState {
  categories: ICategory[]
  setCategories: (categories: ICategory[]) => void
  getAllCategories: () => Promise<void>
  deleteCategory: (id: number) => Promise<void>
  createCategory: (category: ICreateCategory) => Promise<void>
  updateCategory: (id: number, category: IUpdateCategory) => Promise<void>
}

const DEFAULT_CATEGORIES: ICategory[] = []

const STORE_NAME = 'categories'

export const useCategoriesStore = create<StoreState>(
  persist(
    (set, get) => ({
      categories: DEFAULT_CATEGORIES,
      setCategories: (categories: ICategory[]) => {
        set({ categories })
      },
      getAllCategories: async () => {
        const categories = await CategoriesDatasourceImpl.getInstance().getAll()
        set({ categories })
      },
      deleteCategory: async (id: number) => {
        const isDeleted = await CategoriesDatasourceImpl.getInstance().delete(id)
        if (isDeleted) {
          get().getAllCategories()
        }
      },
      createCategory: async (category: ICreateCategory) => {
        await CategoriesDatasourceImpl.getInstance().create(category)
      },
      updateCategory: async (id: number, category: IUpdateCategory) => {
        await CategoriesDatasourceImpl.getInstance().update(id, category)
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
