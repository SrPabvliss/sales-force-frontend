export interface ILocation {
  id: number
  name: string
  isActive: boolean
}

export interface ICreateLocation extends Omit<ILocation, 'id'> {}

export interface IUpdateLocation extends Partial<ICreateLocation> {}
