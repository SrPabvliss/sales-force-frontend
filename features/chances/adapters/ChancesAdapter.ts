// clase que transforma a la data que necesitamos

import { ChanceStatus, IChance } from '../models/IChance'

export class ChancesAdapter {
  static toDomain(data: IChance): IChance {
    return {
      ...data,
      status: data.status != null ? data.status : ChanceStatus.NONE,
    }
  }

  static toDomainList(data: IChance[]): IChance[] {
    return data.map((task) => this.toDomain(task))
  }
}
