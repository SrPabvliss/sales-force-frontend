export interface IService {
  id: number
  name: string
  description?: string
  pricePerHour: number
  isActive: boolean
  isAvailable: boolean
}

export interface ICreateService extends Omit<IService, 'id'> {}

export interface IUpdateService extends Partial<ICreateService> {}
