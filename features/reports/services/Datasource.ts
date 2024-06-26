import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { IEmployeeReports, IProductsReports, ISalesReports, IServicesReports } from '../models/IReports'

export interface ReportsDatasource {
  getServicesReports(): Promise<IServicesReports[]>
  getProductsReports(): Promise<IProductsReports[]>
  getEmployeesReports(id: number): Promise<IEmployeeReports[]>
  getSalesReports(year: number): Promise<ISalesReports[]>
}

export class ReportsDatasourceImpl implements ReportsDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): ReportsDatasourceImpl {
    return new ReportsDatasourceImpl()
  }

  async getServicesReports(): Promise<IServicesReports[]> {
    return await this.httpClient.get<IServicesReports[]>(API_ROUTES.REPORTS.GET_SERVICES)
  }
  async getProductsReports(): Promise<IProductsReports[]> {
    return await this.httpClient.get<IProductsReports[]>(API_ROUTES.REPORTS.GET_PRODUCTS)
  }
  async getEmployeesReports(id: number): Promise<IEmployeeReports[]> {
    return await this.httpClient.get<IEmployeeReports[]>(API_ROUTES.REPORTS.GET_EMPLOYEES(id))
  }
  async getSalesReports(year: number): Promise<ISalesReports[]> {
    return await this.httpClient.get<ISalesReports[]>(API_ROUTES.REPORTS.GET_SALES(year))
  }
}
