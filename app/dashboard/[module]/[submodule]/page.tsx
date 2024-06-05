'use client'
import { useParams } from 'next/navigation'

import { BrandsListView } from '@/features/brands/presentation/view/brands-list-view'
import { CategoriesListView } from '@/features/categories/presentation/view/categories-list-view'
import { ConsumersListView } from '@/features/consumers/presentation/view/consumers-list-view'
import { LocationsListView } from '@/features/locations/presentation/view/locations-list-view'
import { ProductsListView } from '@/features/products/presentation/view/products-list-view'
import { ServicesListView } from '@/features/services-feature/presentation/view/services-list-view'
import { UsersListView } from '@/features/users/presentation/view/users-list-view'
import { FC } from 'react'

const Page: FC = () => {
  const { submodule } = useParams() as { submodule: string }

  const AvaliableListViews: Record<string, FC> = {
    brands: BrandsListView,
    categories: CategoriesListView,
    consumers: ConsumersListView,
    users: UsersListView,
    locations: LocationsListView,
    products: ProductsListView,
    services: ServicesListView,
  }

  const ListView = AvaliableListViews[submodule]

  if (!ListView) {
    return <div>Not Found</div>
  }

  return <ListView />
}

export default Page
