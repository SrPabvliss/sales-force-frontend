'use client'
import { useParams } from 'next/navigation'

import { BrandsEditView } from '@/features/brands/presentation/view/brands-edit-view'
import { FC } from 'react'

interface EditViewProps {
  id: number
}

const EditPage: FC = () => {
  const { submodule, id } = useParams() as { submodule: string; id: string }

  const AvaliableEditViews: Record<string, FC<EditViewProps>> = {
    brands: BrandsEditView,
  }

  const EditView = AvaliableEditViews[submodule]

  if (!EditView) {
    return <div>Not Found</div>
  }

  return <EditView id={Number(id)} />
}

export default EditPage
