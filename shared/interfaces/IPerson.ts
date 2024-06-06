import { ILocation } from '@/features/locations/models/ILocation'

export enum PersonGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export const PersonGenderOptions = {
  [PersonGender.FEMALE]: 'Femenino',
  [PersonGender.MALE]: 'Masculino',
  [PersonGender.OTHER]: 'Otro',
}

export interface IPerson {
  id: number
  dni: string
  name: string
  secondName?: string
  lastName: string
  secondLastName?: string
  gender?: PersonGender
  email?: string
  phone?: string
  birthdate?: Date
  location: ILocation
}

export interface ICreatePerson extends Omit<IPerson, 'id' | 'location'> {
  locationId: number
}
