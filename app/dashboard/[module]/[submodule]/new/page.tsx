'use client'
import { useParams } from 'next/navigation'

import { BrandsCreateView } from '@/features/brands/presentation/view/brands-create-view'
import { CategoriesCreateView } from '@/features/categories/presentation/view/categories-create-view'
import { ConsumersCreateView } from '@/features/consumers/presentation/view/consumers-create-view'
import { LocationsCreateView } from '@/features/locations/presentation/view/locations-create-view'
import { ProductsCreateView } from '@/features/products/presentation/view/products-create-view'
import { ServicesCreateView } from '@/features/services-feature/presentation/view/services-create-view'
import { EmployeesCreateView } from '@/features/users/presentation/view/employees-create-view'
import { FC } from 'react'

const CreatePage: FC = () => {
  const { submodule } = useParams() as { submodule: string }

  const AvaliableCreateViews: Record<string, FC> = {
    brands: BrandsCreateView,
    categories: CategoriesCreateView,
    products: ProductsCreateView,
    consumers: ConsumersCreateView,
    locations: LocationsCreateView,
    users: EmployeesCreateView,
    services: ServicesCreateView,
  }

  const CreateView = AvaliableCreateViews[submodule]

  if (!CreateView) {
    return <div>Not Found</div>
  }

  return (
    <div className="flex items-center justify-center ">
      <CreateView />
    </div>
  )
}

export default CreatePage
