import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ICategory } from '../models/ICategory'
import { CategoriesDatasourceImpl } from '../services/datasource'

interface StoreState {
  categories: ICategory[]
  setCategories: (categories: ICategory[]) => void
  getAllCategories: () => Promise<void>
  deleteCategory: (id: number) => Promise<void>
  createCategory: (category: Omit<ICategory, 'id'>) => Promise<void>
  updateCategory: (id: number, category: Partial<ICategory>) => Promise<void>
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
      createCategory: async (category: Omit<ICategory, 'id'>) => {
        await CategoriesDatasourceImpl.getInstance().create(category)
      },
      updateCategory: async (id: number, category: Partial<ICategory>) => {
        await CategoriesDatasourceImpl.getInstance().update(id, category)
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
