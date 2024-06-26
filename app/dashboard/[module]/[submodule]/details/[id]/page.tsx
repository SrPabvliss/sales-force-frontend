'use client'
import { useParams } from 'next/navigation'

import TransactionDetailsView from '@/features/transactions/presentation/view/transaction-details-view'
import NotFoundPage from '@/shared/components/not-found'
import { FC } from 'react'

interface DetailsViewProps {
  id: number
}

const DetailsPage: FC = () => {
  const { submodule, id } = useParams() as { submodule: string; id: string }

  const AvaliableEditViews: Record<string, FC<DetailsViewProps>> = {
    transactions: TransactionDetailsView,
  }

  const EditView = AvaliableEditViews[submodule]

  if (!EditView) {
    return <NotFoundPage />
  }

  return <EditView id={Number(id)} />
}

export default DetailsPage
