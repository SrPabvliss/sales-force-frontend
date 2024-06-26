import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IEmployeeReports, IProductsReports, ISalesReports, IServicesReports } from '../models/IReports'
import { ReportsDatasourceImpl } from '../services/Datasource'

interface ReportsStoreState {
  servicesReports: IServicesReports[]
  productsReports: IProductsReports[]
  employeesReports: IEmployeeReports[]
  salesReports: ISalesReports[]
  getServicesReports: () => Promise<void>
  getProductsReports: () => Promise<void>
  getEmployeesReports: (id: number) => Promise<void>
  getSalesReports: (year: number) => Promise<void>
}

const DEFAULT_REPORTS: IServicesReports[] = []
const DEFAULT_PRODUCTS_REPORTS: IProductsReports[] = []
const DEFAULT_EMPLOYEES_REPORTS: IEmployeeReports[] = []
const DEFAULT_SALES_REPORTS: ISalesReports[] = []

const STORE_NAME = 'reports'

export const useReportsStore = create<ReportsStoreState>(
  persist(
    (set) => ({
      servicesReports: DEFAULT_REPORTS,
      productsReports: DEFAULT_PRODUCTS_REPORTS,
      employeesReports: DEFAULT_EMPLOYEES_REPORTS,
      salesReports: DEFAULT_SALES_REPORTS,

      getServicesReports: async () => {
        const reports = await ReportsDatasourceImpl.getInstance().getServicesReports()
        set({ servicesReports: reports })
      },
      getProductsReports: async () => {
        const reports = await ReportsDatasourceImpl.getInstance().getProductsReports()
        set({ productsReports: reports })
      },
      getEmployeesReports: async (id: number) => {
        const reports = await ReportsDatasourceImpl.getInstance().getEmployeesReports(id)
        set({ employeesReports: reports })
      },
      getSalesReports: async (year: number) => {
        const reports = await ReportsDatasourceImpl.getInstance().getSalesReports(year)
        set({ salesReports: reports })
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<ReportsStoreState>,
)
