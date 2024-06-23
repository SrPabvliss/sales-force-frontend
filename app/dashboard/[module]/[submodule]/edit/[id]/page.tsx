'use client'
import { useParams } from 'next/navigation'

import { BrandsEditView } from '@/features/brands/presentation/view/brands-edit-view'
import { CategoriesEditView } from '@/features/categories/presentation/view/categories-edit-view'
import { ChancesEditView } from '@/features/chances/presentation/view/chances-edit-view'
import { ConsumersEditView } from '@/features/consumers/presentation/view/consumers-edit-view'
import { DelegationsEditView } from '@/features/delegations/presentation/view/delegations-edit-view'
import { EmployeesEditView } from '@/features/employees/presentation/view/employees-edit-view'
import { LocationsEditView } from '@/features/locations/presentation/view/locations-edit-view'
import { ProductsEditView } from '@/features/products/presentation/view/products-edit-view'
import { QuotasEditView } from '@/features/quotas/presentation/view/quotas-edit-view'
import { ServicesEditView } from '@/features/services-feature/presentation/view/services-edit-view'
import { TasksEditView } from '@/features/tasks/presentation/view/tasks-edit-view'
import { FC } from 'react'

interface EditViewProps {
  id: number
}

const EditPage: FC = () => {
  const { submodule, id } = useParams() as { submodule: string; id: string }

  const AvaliableEditViews: Record<string, FC<EditViewProps>> = {
    brands: BrandsEditView,
    categories: CategoriesEditView,
    products: ProductsEditView,
    consumers: ConsumersEditView,
    locations: LocationsEditView,
    employees: EmployeesEditView,
    services: ServicesEditView,
    quotas: QuotasEditView,
    delegations: DelegationsEditView,
    chances: ChancesEditView,
    tasks: TasksEditView,
  }

  const EditView = AvaliableEditViews[submodule]

  if (!EditView) {
    return <div>Not Found</div>
  }

  return <EditView id={Number(id)} />
}

export default EditPage
