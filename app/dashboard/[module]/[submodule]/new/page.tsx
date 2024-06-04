'use client'
import { useParams } from 'next/navigation'

import { BrandsCreateView } from '@/features/brands/presentation/view/brands-create-view'

export const page = () => {
  const { submodule } = useParams()

  const AvaliableCreateViews = {
    brands: BrandsCreateView,
  }

  const CreateView = AvaliableCreateViews[submodule as keyof typeof AvaliableCreateViews]

  if (!CreateView) {
    return <div>Not Found</div>
  }

  return <CreateView />
}

export default page
