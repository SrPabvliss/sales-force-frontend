import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useProductsStore } from '../context/products-store'

export function useProductsView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllProducts, products, deleteProduct } = useProductsStore()

  useEffect(() => {
    getAllProducts()
  }, [getAllProducts])

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
