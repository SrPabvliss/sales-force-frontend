import { IDelegation } from '@/features/delegations/models/IDelegation'

export enum ChanceStatus {
  WON = 'WON',
  LOST = 'LOST',
}

export interface IChance {
  id: number
  amount: number
  status: ChanceStatus | null
  date: Date
  delegation: IDelegation
}

export interface ICreateChance extends Omit<IChance, 'id' | 'delegation' | 'status'> {
  status?: ChanceStatus
  employeeId: number
  consumerId: number
}

export interface IUpdateChance extends Partial<ICreateChance> {}
