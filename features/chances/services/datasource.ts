import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { ICreateChance, IChance, ChanceStatus } from '../models/IChance'

export interface ChancesDatasource {
  getAll(): Promise<IChance[]>
  getById: (id: number) => Promise<IChance>
  create(delegation: ICreateChance): Promise<IChance>
  updateStatus(id: number, status: ChanceStatus): Promise<boolean>
  delete: (id: number) => Promise<boolean>
}

export class ChancesDatasourceImpl implements ChancesDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): ChancesDatasourceImpl {
    return new ChancesDatasourceImpl()
  }

  async getAll(): Promise<IChance[]> {
    return this.httpClient.get(API_ROUTES.CHANCES.GET_ALL)
  }

  async getById(id: number): Promise<IChance> {
    return this.httpClient.get(API_ROUTES.CHANCES.GET_BY_ID(id))
  }

  async create(chance: ICreateChance): Promise<IChance> {
    return this.httpClient.post(API_ROUTES.CHANCES.CREATE, chance)
  }

  async updateStatus(id: number, status: ChanceStatus | null): Promise<boolean> {
    return this.httpClient.patch(API_ROUTES.CHANCES.UPDATE_STATUS(id), { status })
  }

  async delete(id: number): Promise<boolean> {
    return this.httpClient.delete(API_ROUTES.CHANCES.DELETE(id))
  }
}
