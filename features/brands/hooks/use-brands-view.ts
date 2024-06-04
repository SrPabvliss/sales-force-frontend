import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useBrandsStore } from '../context/brands-store'

export function useBrandsView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllBrands, brands, deleteBrand } = useBrandsStore()

  useEffect(() => {
    getAllBrands()
  }, [getAllBrands])

  const handleDelete = async (id: number) => {
    await deleteBrand(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  return {
    brands,
    handleDelete,
    handleEdit,
    handleAdd,
  }
}
