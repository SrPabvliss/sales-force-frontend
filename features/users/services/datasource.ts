import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { EmployeeAdapter } from '../Adapters/employees-adapter'
import { IApiEmployee } from '../models/IApiEmployee'
import { ICreateEmployee, IEmployee, IUpdateEmployee } from '../models/IEmployee'

export interface EmployeeDatasource {
  getAll(): Promise<IEmployee[]>
  create(employee: ICreateEmployee): Promise<IEmployee>
  update(id: number, employee: IUpdateEmployee): Promise<IEmployee>
  delete(id: number): Promise<boolean>
  // getPermissions(id: number): Promise<number[]>
  // asignPermissions(id: number, permissions: number[]): Promise<boolean>
}

export class EmployeesDatasourceImpl implements EmployeeDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): EmployeesDatasourceImpl {
    return new EmployeesDatasourceImpl()
  }

  async getAll(): Promise<IEmployee[]> {
    const rawData = await this.httpClient.get<IApiEmployee[]>(API_ROUTES.EMPLOYEES.GET)
    return EmployeeAdapter.toDomainList(rawData)
  }

  async create(employee: ICreateEmployee): Promise<IEmployee> {
    const rawData = await this.httpClient.post<IApiEmployee>(API_ROUTES.EMPLOYEES.CREATE, employee)
    return EmployeeAdapter.toDomain(rawData)
  }

  async update(id: number, employee: IUpdateEmployee): Promise<IEmployee> {
    const rawData = await this.httpClient.patch<IApiEmployee>(API_ROUTES.EMPLOYEES.UPDATE(id), employee)
    return EmployeeAdapter.toDomain(rawData)
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.patch<boolean>(`${API_ROUTES.EMPLOYEES.TOGGLE_ACTIVE(id)}`)
  }

  // async getPermissions(id: number): Promise<number[]> {
  //   return await this.httpClient.get<number[]>(API_ROUTES.EMPLOYEES.GET_PERMISSIONS(id))
  // }

  // async asignPermissions(id: number, permissions: number[]): Promise<boolean> {
  //   return await this.httpClient.post<boolean>(API_ROUTES.EMPLOYEES.ASIGN_PERMISSIONS(id), permissions)
  // }
}
