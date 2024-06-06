export enum LocationType {
  COUNTRY = 'COUNTRY',
  STATE = 'STATE',
  CITY = 'CITY',
  NEIGHBORHOOD = 'NEIGHBORHOOD',
}

export interface ILocation {
  id: number
  name: string
  type: LocationType
  isActive: boolean
}
