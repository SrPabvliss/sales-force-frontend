export interface IServicesReports {
  name: string
  quantity: number
}

export interface IProductsReports {
  name: string
  quantity: number
}

export interface IEmployeeReports {
  type: string
  total: number
}

export interface ISalesReports {
  [month: number]: number
}
