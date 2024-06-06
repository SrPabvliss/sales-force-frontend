'use client'
import { useParams } from 'next/navigation'

import { BrandsCreateView } from '@/features/brands/presentation/view/brands-create-view'
import { CategoriesCreateView } from '@/features/categories/presentation/view/categories-create-view'
import { ConsumersCreateView } from '@/features/consumers/presentation/view/consumers-create-view'
import { ProductsCreateView } from '@/features/products/presentation/view/products-create-view'
import { FC } from 'react'

const CreatePage: FC = () => {
  const { submodule } = useParams() as { submodule: string }

  const AvaliableCreateViews: Record<string, FC> = {
    brands: BrandsCreateView,
    categories: CategoriesCreateView,
    products: ProductsCreateView,
    consumers: ConsumersCreateView,
  }

  const CreateView = AvaliableCreateViews[submodule]

  if (!CreateView) {
    return <div>Not Found</div>
  }

  return <CreateView />
}

export default CreatePage
