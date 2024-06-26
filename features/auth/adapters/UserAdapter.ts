// clase que transforma a la data que necesitamos

import { IApiUser } from '../models/IApiUser'
import { IUser } from '../models/IUser'

export class UserAdapter {
  static toDomain(data: IApiUser): IUser {
    return {
      id: data.employee.id,
      role: data.employee.role,
      isActive: data.employee.isActive,
      person: data.employee.person,
    }
  }
}
