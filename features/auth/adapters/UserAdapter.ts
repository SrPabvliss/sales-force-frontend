// clase que transforma a la data que necesitamos

import { IApiUser } from '../models/IApiUser'
import { IUser } from '../models/IUser'

export class UserAdapter {
  static toDomain(data: IApiUser): IUser {
    return {
      id: data.id,
      firstLastName: data.firstLastName,
      firstName: data.firstName,
      role: data.role,
      accessModules: data.accessModules,
    }
  }
}
