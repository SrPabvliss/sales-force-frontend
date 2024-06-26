import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import {
  TransactionTypeTranslations,
  TransactionOriginTranslations,
  TransactionOrigin,
  TransactionType,
  TransactionStatusTranslations,
} from '@/features/transactions/models/ITransaction'
import { ClipboardMinus, Store, User } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import NoItems from '../../../../public/no-items-transformed.png'
import { useTransactionsStore } from '../../context/transactions-store'

const TransactionDetails: React.FC<{ id: number }> = ({ id }) => {
  const { transactions } = useTransactionsStore()
  const router = useRouter()
  const pathname = usePathname()

  const transaction = transactions.find((transaction) => transaction.id === id)

  return (
    <div className="mx-auto mt-0 flex min-h-screen w-3/4 flex-col items-center justify-center">
      <div className="space-y-4 p-4">
        <Button variant={'outline'} onClick={() => router.push(pathname.split('/').slice(0, -2).join('/'))}>
          Volver
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Transacción {transaction?.id}
              <Badge>{transaction?.status ? TransactionStatusTranslations[transaction?.status] : 'Sin asignar'}</Badge>
            </CardTitle>
            <CardDescription>
              <div className="flex items-center justify-between">
                <span>{transaction?.date && new Date(transaction?.date).toLocaleDateString()}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${transaction?.total?.toFixed(2)}</p>
            <div className="mt-4 grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="flex flex-col items-center">
                  <User height={50} width={50} className="mt-4" />
                  <p className="mt-2 font-semibold">Empleado</p>
                  <p>{`${transaction?.delegation.employee.person.name} ${transaction?.delegation.employee.person.lastName}`}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center">
                  <User height={50} width={50} className="mt-4" />
                  <p className="mt-2 font-semibold">Consumidor</p>
                  <p>{`${transaction?.delegation.consumer.person.name} ${transaction?.delegation.consumer.person.lastName}`}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center">
                  <ClipboardMinus height={50} width={50} className="mt-4" />
                  <p className="mt-2 font-semibold">Origen</p>
                  <p>{TransactionOriginTranslations[transaction?.origin ?? TransactionOrigin.SALE]}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center">
                  <Store height={50} width={50} className="mt-4" />
                  <p className="mt-2 font-semibold">Tipo</p>
                  <p>{TransactionTypeTranslations[transaction?.type ?? TransactionType.LOCAL]}</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Artículos</CardTitle>
          </CardHeader>
          <CardContent className="flex w-[1000px] gap-4">
            <div className="flex-1">
              <h4 className="mb-4 text-lg font-medium">Productos</h4>
              <ScrollArea className="mb-4 h-72 w-full rounded-md border">
                {transaction?.items?.filter((item) => item.product).length &&
                transaction?.items?.filter((item) => item.product).length > 0 ? (
                  transaction?.items
                    .filter((item) => item.product)
                    .map((item, index) => (
                      <div key={index} className="flex items-center gap-6 border-b p-4">
                        <div>
                          <div className="flex items-center gap-4 font-semibold ">
                            <p className="text-lg">{item.product!.name}</p>
                            <Badge variant={'outline'}>${item.product!.price.toFixed(2)}</Badge>
                          </div>
                          <p className="text-sm text-gray-500">{item.product!.description}</p>
                          <p className="text-md font-semibold">
                            Unidades:
                            <span className="text-sm font-medium"> {item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex h-72 flex-col items-center justify-center">
                    <Image src={NoItems.src} alt="No Comments" width={150} height={150} />
                    <p className="  text-center text-sm text-opacity-50">
                      No se han agregado productos a esta transacción.
                    </p>
                  </div>
                )}
              </ScrollArea>
            </div>
            <div className="flex-1">
              <h4 className="mb-4 text-lg font-medium">Servicios</h4>
              <ScrollArea className="flex h-72 w-full flex-col items-center justify-center rounded-md border">
                {transaction?.items.filter((item) => item.service).length &&
                transaction.items.filter((item) => item.service).length > 0 ? (
                  transaction.items
                    .filter((item) => item.service)
                    .map((item, index) => (
                      <div key={index} className="flex items-center gap-6 border-b p-4">
                        <div>
                          <div className="flex items-center gap-4 font-semibold ">
                            <p className="text-lg">{item.service!.name}</p>
                            <Badge variant={'outline'}>${item.service!.pricePerHour.toFixed(2)}</Badge>
                          </div>
                          <p className="text-sm text-gray-500">{item.service!.description}</p>
                          <p className="text-md font-semibold">
                            Horas:
                            <span className="text-sm font-medium"> {item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex h-72 flex-col items-center justify-center">
                    <Image src={NoItems.src} alt="No Comments" width={150} height={150} />
                    <p className="  text-center text-sm text-opacity-50">
                      No se han agregado servicios a esta transacción.
                    </p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TransactionDetails
