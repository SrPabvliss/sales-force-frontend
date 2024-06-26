import { usePathname, useRouter } from 'next/navigation'

import { useBrandsStore } from '@/features/brands/context/brands-store'
import { useCategoriesStore } from '@/features/categories/context/categories-store'
import { useEffect } from 'react'

import { useProductsStore } from '../context/products-store'

export function useProductsView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllProducts, products, deleteProduct } = useProductsStore()
  const { getAllCategories } = useCategoriesStore()
  const { getAllBrands } = useBrandsStore()

  useEffect(() => {
    getAllProducts()
    getAllCategories()
    getAllBrands()
  }, [getAllProducts, getAllCategories, getAllBrands])

  const handleDelete = async (id: number) => {
    await deleteProduct(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  return {
    products,
    handleDelete,
    handleEdit,
    handleAdd,
  }
}
