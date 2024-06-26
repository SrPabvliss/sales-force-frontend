import { IProduct } from '@/features/products/models/IProduct'
import { IService } from '@/features/services-feature/models/IService'

import { ITransaction } from './ITransaction'

export interface IItem {
  id: number
  quantity: number
  discount: number | null
  transaction: ITransaction
  product: IProduct | null
  service: IService | null
}

export interface ICreateItem extends Omit<IItem, 'id' | 'discount' | 'product' | 'service' | 'transaction'> {
  discount?: number
  productId?: number
  serviceId?: number
}

export interface IUpdateItem extends Partial<ICreateItem> {}
