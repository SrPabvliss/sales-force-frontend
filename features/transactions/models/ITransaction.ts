import { IDelegation } from '@/features/delegations/models/IDelegation'
import { ITask } from '@/features/tasks/models/ITask'

import { ICreateItem, IItem, IUpdateItem } from './IItem'
import { IPayMethod } from './IPaymentMethod'

export enum TransactionStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
}

export enum TransactionType {
  LOCAL = 'LOCAL',
  ONLINE = 'ONLINE',
  DOOR_TO_DOOR = 'DOOR_TO_DOOR',
}

export const TransactionTypeTranslations: Record<TransactionType, string> = {
  [TransactionType.LOCAL]: 'Local',
  [TransactionType.ONLINE]: 'En línea',
  [TransactionType.DOOR_TO_DOOR]: 'Puerta a Puerta',
}

export enum TransactionOrigin {
  SALE = 'SALE',
  QUOTATION = 'QUOTATION',
}

export const TransactionOriginTranslations: Record<TransactionOrigin, string> = {
  [TransactionOrigin.SALE]: 'Venta',
  [TransactionOrigin.QUOTATION]: 'Cotización',
}

export interface ITransaction {
  id: number
  date: Date
  total: number | null
  status: TransactionStatus | null
  type: TransactionType
  origin: TransactionOrigin
  expiration: Date | null
  successProbability: number | null
  delegation: IDelegation
  task: ITask | null
  payMethod: IPayMethod | null
  items: IItem[]
}

export interface ICreateTransaction
  extends Omit<
    ITransaction,
    | 'id'
    | 'date'
    | 'total'
    | 'status'
    | 'expiration'
    | 'successProbability'
    | 'delegation'
    | 'task'
    | 'payMethod'
    | 'items'
  > {
  date?: Date
  total?: number
  status?: TransactionStatus
  expiration?: Date
  successProbability?: number
  delegationId: number
  taskId?: number
  payMethodId?: number
  items: ICreateItem[]
}

export interface IUpdateTransaction extends Partial<Omit<ICreateTransaction, 'items'>> {
  items?: IUpdateItem[]
}
