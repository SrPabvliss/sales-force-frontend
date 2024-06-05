// clase que transforma a la data que necesitamos

import { IApiBrand } from '../models/IApiBrands'
import { IBrand } from '../models/IBrands'

export class BrandAdapter {
  static toDomain(data: IApiBrand): IBrand {
    return {
      id: data.id,
      name: data.name,
      isActive: data.isActive,
    }
  }

  static toApi(data: IBrand): IApiBrand {
    return {
      id: data.id,
      name: data.name,
      isActive: data.isActive,
    }
  }

  static toDomainList(data: IApiBrand[]): IBrand[] {
    return data.map((item) => this.toDomain(item))
  }
}
