// clase que transforma a la data que necesitamos

import { IApiUser } from "../models/IApiUser";
import { IUser } from "../models/IUser";


export class UserAdapter {

  static toDomain(data: IApiUser): IUser {
    return {
      name: data.name,
      height: data.height,
      weight: data.weight,
      isDefault: data.is_default
    }
  }
}