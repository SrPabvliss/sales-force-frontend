import { ICreatePerson, IPerson } from '@/shared/interfaces/IPerson'

export enum ConsumerType {
  NATURAL = 'NATURAL',
  COMPANY = 'COMPANY',
}

export const ConsumerTypeOptions = {
  [ConsumerType.NATURAL]: 'Natural',
  [ConsumerType.COMPANY]: 'Jurídico',
}

export interface IConsumer {
  id: number
  type: ConsumerType
  isCustomer: boolean
  isActive: boolean
  person: IPerson
}

export interface ICreateConsumer extends Omit<IConsumer, 'id' | 'person'> {
  person: ICreatePerson
}

export interface IUpdateConsumer extends Partial<ICreateConsumer> {}
