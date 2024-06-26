export interface IBrand {
  id: number
  name: string
  isActive: boolean
}

export interface ICreateBrand extends Omit<IBrand, 'id'> {}

export interface IUpdateBrand extends Partial<ICreateBrand> {}
