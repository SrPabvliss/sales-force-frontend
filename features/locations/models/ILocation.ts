export enum LocationType {
  COUNTRY = 'COUNTRY',
  STATE = 'STATE',
  CITY = 'CITY',
  NEIGHBORHOOD = 'NEIGHBORHOOD',
}

export interface LocationTypeOption {
  value: LocationType
  label: string
}

export const locationTypeOptions: LocationTypeOption[] = [
  { value: LocationType.COUNTRY, label: 'País' },
  { value: LocationType.STATE, label: 'Estado' },
  { value: LocationType.CITY, label: 'Ciudad' },
  { value: LocationType.NEIGHBORHOOD, label: 'Barrio' },
]

export interface ILocation {
  id: number
  name: string
  type: LocationType
  isActive: boolean
  parent?: ILocation
}

export interface ILocationCreate extends Omit<ILocation, 'id' | 'parent'> {
  parentId?: number
}

export interface ILocationUpdate extends Partial<ILocationCreate> {
  parentId?: number
}
