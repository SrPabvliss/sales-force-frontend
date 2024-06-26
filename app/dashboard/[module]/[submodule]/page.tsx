'use client'
import { useParams } from 'next/navigation'

import AccessControl from '@/core/layout/route-protector'
import { BrandsListView } from '@/features/brands/presentation/view/brands-list-view'
import { CategoriesListView } from '@/features/categories/presentation/view/categories-list-view'
import { ChancesListView } from '@/features/chances/presentation/view/chances-list-view'
import { ConsumersListView } from '@/features/consumers/presentation/view/consumers-list-view'
import { DelegationsListView } from '@/features/delegations/presentation/view/delegations-list-view'
import { EmployeesListView } from '@/features/employees/presentation/view/employees-list-view'
import { LocationsListView } from '@/features/locations/presentation/view/locations-list-view'
import { ProductsListView } from '@/features/products/presentation/view/products-list-view'
import { QuotasListView } from '@/features/quotas/presentation/view/quotas-list-view'
import { ReportsView } from '@/features/reports/presentation/view/reports-view'
import { ServicesListView } from '@/features/services-feature/presentation/view/services-list-view'
import { TasksListView } from '@/features/tasks/presentation/view/tasks-list-view'
import { TransactionListView } from '@/features/transactions/presentation/view/transactions-list-view'
import NotFoundPage from '@/shared/components/not-found'
import { FC } from 'react'

const Page: FC = () => {
  const { submodule } = useParams() as { submodule: string }

  const AvaliableListViews: Record<string, FC> = {
    brands: BrandsListView,
    categories: CategoriesListView,
    consumers: ConsumersListView,
    employees: EmployeesListView,
    locations: LocationsListView,
    products: ProductsListView,
    services: ServicesListView,
    quotas: QuotasListView,
    delegations: DelegationsListView,
    chances: ChancesListView,
    tasks: TasksListView,
    transactions: TransactionListView,
    reports: ReportsView,
  }

  const ListView = AvaliableListViews[submodule]

  if (!ListView) {
    return <NotFoundPage />
  }

  return (
    <AccessControl>
      <ListView />
    </AccessControl>
  )
}

export default Page
