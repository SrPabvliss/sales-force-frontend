'use client'
import { useParams } from 'next/navigation'

import { BrandsCreateView } from '@/features/brands/presentation/view/brands-create-view'
import { CategoriesCreateView } from '@/features/categories/presentation/view/categories-create-view'
import { ChancesCreateView } from '@/features/chances/presentation/view/chances-create-view'
import { ConsumersCreateView } from '@/features/consumers/presentation/view/consumers-create-view'
import { DelegationsCreateView } from '@/features/delegations/presentation/view/delegations-create-view'
import { EmployeesCreateView } from '@/features/employees/presentation/view/employees-create-view'
import { LocationsCreateView } from '@/features/locations/presentation/view/locations-create-view'
import { ProductsCreateView } from '@/features/products/presentation/view/products-create-view'
import { QuotasCreateView } from '@/features/quotas/presentation/view/quotas-create-view'
import { ServicesCreateView } from '@/features/services-feature/presentation/view/services-create-view'
import { TasksCreateView } from '@/features/tasks/presentation/view/tasks-create-view'
import { TransactionsCreateView } from '@/features/transactions/presentation/view/transactions-create-view'
import NotFoundPage from '@/shared/components/not-found'
import { FC } from 'react'

const CreatePage: FC = () => {
  const { submodule } = useParams() as { submodule: string }

  const AvaliableCreateViews: Record<string, FC> = {
    brands: BrandsCreateView,
    categories: CategoriesCreateView,
    products: ProductsCreateView,
    consumers: ConsumersCreateView,
    locations: LocationsCreateView,
    employees: EmployeesCreateView,
    services: ServicesCreateView,
    quotas: QuotasCreateView,
    delegations: DelegationsCreateView,
    chances: ChancesCreateView,
    tasks: TasksCreateView,
    transactions: TransactionsCreateView,
  }

  const CreateView = AvaliableCreateViews[submodule]

  if (!CreateView) {
    return <NotFoundPage />
  }

  return (
    <div className="flex items-center justify-center ">
      <CreateView />
    </div>
  )
}

export default CreatePage
