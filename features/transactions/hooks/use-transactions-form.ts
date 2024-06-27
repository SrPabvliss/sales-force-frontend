import { usePathname, useRouter } from 'next/navigation'

import { useProductsStore } from '@/features/products/context/products-store'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { useTransactionsStore } from '../context/transactions-store'
import {
  ICreateTransaction,
  ITransaction,
  IUpdateTransaction,
  TransactionOrigin,
  TransactionType,
} from '../models/ITransaction'
import { timeOptions } from '../presentation/components/probability-selector'

export function useTransactionsForm(currentTransaction?: ITransaction) {
  const { createTransaction, updateTransaction } = useTransactionsStore()
  const { products } = useProductsStore()
  const router = useRouter()
  const pathname = usePathname()

  const getClosesProbability = (probability: number) => {
    return timeOptions.reduce((prev, curr) =>
      Math.abs(curr - probability) < Math.abs(prev - probability) ? curr : prev,
    )
  }

  const initialValues = {
    employeeId: currentTransaction?.delegation.employee.id.toString() || '',
    delegationId: currentTransaction?.delegation.id.toString() || '',
    taskId: currentTransaction?.task?.id.toString() || undefined,
    payMethodId: currentTransaction?.payMethod?.id.toString() || '',
    type: currentTransaction?.type || TransactionType.DOOR_TO_DOOR,
    origin: currentTransaction?.origin || TransactionOrigin.SALE,
    date: currentTransaction?.date || new Date(),
    expiration: currentTransaction?.expiration || new Date(),
    successProbability: currentTransaction?.successProbability
      ? getClosesProbability(currentTransaction?.successProbability)
      : 0,
    items:
      currentTransaction?.items.map((item) => {
        return {
          productId: item.product ? item.product.id.toString() : undefined,
          serviceId: item.service ? item.service.id.toString() : undefined,
          quantity: item.quantity,
        }
      }) || [],
  }

  const uniqueProductTest = yup
    .string()
    .nullable()
    .test('unique-product', 'El producto debe ser único', function (value) {
      const items = this.options?.context?.items.filter((item: any) => item.productId)
      const count = items.filter((item: any) => item.productId === value).length
      return count <= 1
    })

  const uniqueServiceTest = yup
    .string()
    .nullable()
    .test('unique-service', 'El servicio debe ser único', function (value) {
      const items = this.options.context?.items.filter((item: any) => item.serviceId)
      const count = items.filter((item: any) => item.serviceId === value).length
      return count <= 1
    })

  const validationSchema = yup.object().shape({
    employeeId: yup.string().required('El empleado es requerido'),
    delegationId: yup.string().required('La delegación es requerida'),
    successProbability: yup.number(),
    payMethodId: yup.string().required('El método de pago es requerido'),
    type: yup.string().required('El tipo de transacción es requerido'),
    origin: yup.string().required('El origen de la transacción es requerido'),
    date: yup.date().required('La fecha es requerida'),
    expiration: yup.date().required('La fecha de expiración es requerida'),
    taskId: yup.string().optional(),
    items: yup.array().of(
      yup.object().shape({
        productId: uniqueProductTest,
        serviceId: uniqueServiceTest,
        quantity: yup.number().required('La cantidad es requerida'),
      }),
    ),
  })
  const handleSubmit = async (data: ICreateTransaction | IUpdateTransaction) => {
    let hasErrors = false

    if (data?.items?.length === 0) {
      toast.error('Debe haber al menos un producto o servicio')
      hasErrors = true
    }

    data.items?.forEach((item: any) => {
      if (item.productId === '' && item.serviceId === null) {
        toast.error('El producto no puede estar vacío')
        hasErrors = true
      }

      if (item.quantity <= 0) {
        toast.error('La cantidad debe ser mayor a 0')
        hasErrors = true
      }

      if (item.productId === null && item.serviceId === '') {
        toast.error('El servicio no puede estar vacío')
        hasErrors = true
      }
      if (item.productId !== null && item.productId !== '') {
        const product = products.find((product) => product.id.toString() === item.productId)
        if (product?.stock && item.quantity > product?.stock) {
          toast.error(`La cantidad del producto ${product.name} no puede ser mayor al stock`)
          hasErrors = true
        }
      }
    })

    if (hasErrors) return

    const formattedData = {
      date: data.date,
      delegationId: Number(data.delegationId),
      expiration: data.expiration,
      items: (data.items || []).map((item: any) => ({
        productId: item.productId ? Number(item.productId) : undefined,
        serviceId: item.serviceId ? Number(item.serviceId) : undefined,
        quantity: Number(item.quantity),
      })),
      origin: data.origin ? data.origin : TransactionOrigin.SALE,
      payMethodId: Number(data.payMethodId),
      successProbability: data.successProbability,
      taskId: data.taskId ? Number(data.taskId) : undefined,
      type: data.type ? data.type : TransactionType.DOOR_TO_DOOR,
    }

    if (currentTransaction) {
      await updateTransaction(currentTransaction.id, formattedData)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }

    await createTransaction(formattedData)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
