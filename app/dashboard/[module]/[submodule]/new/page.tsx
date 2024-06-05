'use client'
import { useParams } from 'next/navigation'

import { BrandsCreateView } from '@/features/brands/presentation/view/brands-create-view'
import { FC } from 'react'

const CreatePage: FC = () => {
  const { submodule } = useParams() as { submodule: string }

  const AvaliableCreateViews: Record<string, FC> = {
    brands: BrandsCreateView,
  }

  const CreateView = AvaliableCreateViews[submodule]

  if (!CreateView) {
    return <div>Not Found</div>
  }

  return <CreateView />
}

export default CreatePage
