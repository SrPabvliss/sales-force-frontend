import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { IMostSoldItem, ITransactionEmployee, ITransactionYear } from '../models/IReports'

export interface ReportsDatasource {
  transactionReportByYear(year: number): Promise<ITransactionYear>
  transactionReportByEmployee(employeeId: number): Promise<ITransactionEmployee[]>
  mostSoldProducts(): Promise<IMostSoldItem[]>
  mostSoldSevices(): Promise<IMostSoldItem[]>
}

export class ReportsDatasourceImpl implements ReportsDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): ReportsDatasourceImpl {
    return new ReportsDatasourceImpl()
  }

  async transactionReportByYear(year: number): Promise<ITransactionYear> {
    return await this.httpClient.get<ITransactionYear>(`${API_ROUTES.REPORTS.TRANSACTION_REPORT_BY_YEAR(year)}`)
  }

  async transactionReportByEmployee(employeeId: number): Promise<ITransactionEmployee[]> {
    return await this.httpClient.get<ITransactionEmployee[]>(
      `${API_ROUTES.REPORTS.TRANSACTION_REPORT_BY_EMPLOYEE(employeeId)}`,
    )
  }

  async mostSoldProducts(): Promise<IMostSoldItem[]> {
    return await this.httpClient.get<IMostSoldItem[]>(API_ROUTES.REPORTS.MOST_SOLD_PRODUCTS)
  }

  async mostSoldSevices(): Promise<IMostSoldItem[]> {
    return await this.httpClient.get<IMostSoldItem[]>(API_ROUTES.REPORTS.MOST_SOLD_SERVICES)
  }
}
