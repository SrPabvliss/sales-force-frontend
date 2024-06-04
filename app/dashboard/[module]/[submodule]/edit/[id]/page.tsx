'use client'
import { useParams } from 'next/navigation'

import { BrandsEditView } from '@/features/brands/presentation/view/brands-edit-view'

export const page = () => {
  const { submodule, id } = useParams()

  const AvaliableEditViews = {
    brands: BrandsEditView,
  }

  const EditView = AvaliableEditViews[submodule as keyof typeof AvaliableEditViews]

  if (!EditView) {
    return <div>Not Found</div>
  }

  return <EditView id={Number(id)} />
}

export default page
