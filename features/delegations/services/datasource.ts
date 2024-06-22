import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { ICreateDelegation, IDelegation, IUpdateDelegation } from '../models/IDelegation'

export interface DelegationsDatasource {
  getAll(): Promise<IDelegation[]>
  getAllByEmployee(id: number): Promise<IDelegation[]>
  getById: (id: number) => Promise<IDelegation>
  create(delegation: ICreateDelegation): Promise<IDelegation>
  update(id: number, delegation: IUpdateDelegation): Promise<IDelegation>
  toggleActive(id: number): Promise<boolean>
}

export class DelegationsDatasourceImpl implements DelegationsDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  async getAll(): Promise<IDelegation[]> {
    return await this.httpClient.get<IDelegation[]>(API_ROUTES.DELEGATIONS.GET_ALL)
  }

  static getInstance(): DelegationsDatasourceImpl {
    return new DelegationsDatasourceImpl()
  }

  async getAllByEmployee(id: number): Promise<IDelegation[]> {
    return await this.httpClient.get<IDelegation[]>(API_ROUTES.DELEGATIONS.GET_BY_EMPLOYEE(id))
  }

  async getById(id: number): Promise<IDelegation> {
    return await this.httpClient.get<IDelegation>(API_ROUTES.DELEGATIONS.GET_BY_ID(id))
  }

  async create(delegation: ICreateDelegation): Promise<IDelegation> {
    return await this.httpClient.post<IDelegation>(API_ROUTES.DELEGATIONS.CREATE, delegation)
  }

  async update(id: number, delegation: IUpdateDelegation): Promise<IDelegation> {
    return await this.httpClient.patch<IDelegation>(`${API_ROUTES.DELEGATIONS.UPDATE(id)}`, delegation)
  }

  async toggleActive(id: number): Promise<boolean> {
    return await this.httpClient.patch<boolean>(`${API_ROUTES.DELEGATIONS.TOGGLE_ACTIVE(id)}`)
  }
}
