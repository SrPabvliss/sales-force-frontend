import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useCategoriesStore } from '../context/categories-store'

export function useCategoriesView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllCategories, categories, deleteCategory } = useCategoriesStore()

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])

  const handleDelete = async (id: number) => {
    await deleteCategory(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  return {
    categories,
    handleDelete,
    handleEdit,
    handleAdd,
  }
}
