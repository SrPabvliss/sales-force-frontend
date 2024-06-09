import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IEmployee, ICreateEmployee, IUpdateEmployee } from '../models/IEmployee'
import { EmployeesDatasourceImpl } from '../services/datasource'

interface StoreState {
  employees: IEmployee[]
  setEmployees: (employees: IEmployee[]) => void
  getAllEmployees: () => Promise<void>
  deleteEmployee: (id: number) => Promise<void>
  createEmployee: (employee: ICreateEmployee) => Promise<void>
  updateEmployee: (id: number, employee: IUpdateEmployee) => Promise<void>
}

const DEFAULT_EMPLOYEES: IEmployee[] = []

const STORE_NAME = 'employees'

export const useEmployeesStore = create<StoreState>(
  persist(
    (set, get) => ({
      employees: DEFAULT_EMPLOYEES,
      setEmployees: (employees: IEmployee[]) => {
        set({ employees })
      },
      getAllEmployees: async () => {
        const employees = await EmployeesDatasourceImpl.getInstance().getAll()
        set({ employees })
      },
      deleteEmployee: async (id: number) => {
        const isDeleted = await EmployeesDatasourceImpl.getInstance().delete(id)
        if (isDeleted) {
          get().getAllEmployees()
        }
      },
      createEmployee: async (employee: ICreateEmployee) => {
        await EmployeesDatasourceImpl.getInstance().create(employee)
      },
      updateEmployee: async (id: number, employee: IUpdateEmployee) => {
        await EmployeesDatasourceImpl.getInstance().update(id, employee)
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
